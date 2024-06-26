import styles from "./PatientRecords.module.css";
import { toast } from "react-toastify";
import { useRef, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Search from "./Search";
import Button from "./Button";
import TableHeader from "./TableHeader";
import PatientRow from "./PatientRow";
import PatientDetail from "./PatientDetail";
import Modal from "./Modal";

export default function PatientRecords() {
  const [query, setQuery] = useState("");
  const [patientId, setpatientId] = useState(null);
  const [patients, setPatients] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // user wasn't used apart from trying confrim the user is logged in or not
  // that's why it wasn't used
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const firstInputRef = useRef(null);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch("/api/users/getUser");
      console.log(response);

      if (!response.ok) {
        // If the response is not ok, show a toast and navigate to login
        toast.error("You are not logged in! Please log in", {
          position: toast.POSITION.TOP_RIGHT,
          theme: "dark",
        });
        setUser(null);
        navigate("/login");
      } else {
        // Only proceed to process data if the response is ok
        const data = await response.json();
        console.log("Patient Record", data);

        if (data.username) {
          setUser(data.username);
        } else {
          // Handle the case where username is undefined in a successful response
          toast.error("Unable to retrieve user data. Please log in again.", {
            position: toast.POSITION.TOP_RIGHT,
            theme: "dark",
          });
          navigate("/login");
        }
      }
    };

    fetchUser();
  }, [navigate]);

  useEffect(() => {
    if (isModalOpen) {
      firstInputRef.current.focus();
    }
  }, [isModalOpen]);

  const [formData, setFormData] = useState({
    id: "",
    first_name: "",
    last_name: "",
    email: "",
    gender: "",
    date_of_birth: "",
  });
  const [searchedPatients, setSearchPatients] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === "id" ? Number(value) : value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: newValue,
    }));
  };

  function resetForm() {
    setFormData({
      id: "",
      first_name: "",
      last_name: "",
      email: "",
      gender: "",
      date_of_birth: "",
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsModalOpen(false);
    resetForm();
    if (patientId === null) {
      try {
        const res = await fetch("/api/patients", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const resJSON = await res.json();

        if (res.status === 201) {
          toast.success("Patient Added Successfully!", {
            position: toast.POSITION.TOP_RIGHT,
            theme: "dark",
          });
          console.log(resJSON.data.newPatient.insertedId);
          const newPatient = formData;
          newPatient._id = resJSON.data.newPatient.insertedId;
          setPatients((patients) => [...patients, newPatient]);
        }
      } catch (err) {
        console.log(err.message);
      }
      console.log(formData);
      console.log("Submitted");
    } else {
      try {
        const dataToUpdate = formData;
        dataToUpdate._id = patientId;
        console.log(dataToUpdate);
        const res = await fetch("/api/patients", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToUpdate),
        });
        if (res.status === 200) {
          toast.success("Patient's detail updated successfully!", {
            position: toast.POSITION.TOP_RIGHT,
            theme: "dark",
          });
        }

        const resultJSON = await res.json();
        console.log(resultJSON.data.updatedPatient);

        const filteredPatients = patients.filter((p) => p.id !== patientId);
        setPatients([resultJSON.data.updatedPatient, ...filteredPatients]);
      } catch (err) {
        console.log(err.message);
      }
      console.log(formData);
      console.log("Submitted");
    }
  }

  function closeModal() {
    resetForm();
    setQuery("");
    setpatientId(null);
  }

  function selectPatientId(id) {
    setpatientId((patientId) => (id === patientId ? null : id));
  }

  function onSetIsModalOpen() {
    setIsModalOpen(() => !isModalOpen);
  }

  function onPrefilledModalOpen() {
    const patient = patients.find((p) => p._id === patientId);

    setFormData({
      id: patient.id,
      first_name: patient.first_name,
      last_name: patient.last_name,
      email: patient.email,
      gender: patient.gender,
      date_of_birth: patient.date_of_birth,
    });

    setIsModalOpen(() => !isModalOpen);
  }

  const filterPatients = useCallback(() => {
    const searchQuery = query.toLowerCase();

    const filtered = patients.filter((p) => {
      const fullName = (p.first_name + " " + p.last_name).toLocaleLowerCase();
      return fullName.includes(searchQuery);
    });

    setSearchPatients(filtered);
  }, [query, patients, setSearchPatients]);

  useEffect(() => {
    filterPatients();
  }, [filterPatients]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/patients");
        const result = await res.json();
        console.log(result.data.patients);
        setPatients(result.data.patients);
      } catch (err) {
        console.log(err.message);
      }
    }
    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      {
        <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={`${styles.row} ${styles.title}`}>
              <span>
                {!patientId
                  ? "Add a New Patient"
                  : "Update Patient Information"}
              </span>
            </div>
            <div className={styles.row}>
              <label htmlFor="First Name">First Name</label>
              <input
                ref={firstInputRef}
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                placeholder="First Name"
                required
              />
            </div>
            <div className={styles.row}>
              <label htmlFor="last_name">Last Name</label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                placeholder="Last Name"
                required
              />
            </div>
            {!patientId && (
              <div className={styles.row}>
                <label htmlFor="date_of_birth">Date of Birth</label>
                <input
                  type="date"
                  name="date_of_birth"
                  value={formData.date_of_birth}
                  onChange={handleChange}
                  placeholder="12/13/1998"
                  required
                />
              </div>
            )}
            <div className={styles.row}>
              <label htmlFor="id">ID</label>
              <input
                type="id"
                name="id"
                value={formData.id}
                onChange={handleChange}
                placeholder="12"
                required
              />
            </div>
            <div className={styles.row}>
              <label htmlFor="First Name">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className={styles.row}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
              />
            </div>
            {patientId ? (
              <Button actionType="submit" type="secondary">
                Update
              </Button>
            ) : (
              <Button actionType="submit" type="secondary">
                Add
              </Button>
            )}
          </form>
        </Modal>
      }
      {patientId ? (
        <PatientDetail
          closeModal={closeModal}
          patients={patients}
          patientId={patientId}
          onPrefilledModalOpen={onPrefilledModalOpen}
          setpatientId={setpatientId}
          setPatients={setPatients}
        />
      ) : (
        <>
          <h2>All Patients Records</h2>
          <div className={styles.patientNav}>
            <Search
              query={query}
              setQuery={setQuery}
              patients={patients}
              filterPatients={filterPatients}
            />
            <Button onClick={onSetIsModalOpen} type="patientB">
              Add New Patient
            </Button>
          </div>
          <div className={styles.tableContainer}>
            <TableHeader />

            {(query === "" ? patients : searchedPatients).map((patient) => (
              <PatientRow
                selectPatientId={selectPatientId}
                patient={patient}
                first_name={patient.first_name}
                last_name={patient.last_name}
                id={patient.id}
                key={patient._id}
                date_of_birth={patient.date_of_birth}
                gender={patient.gender}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
