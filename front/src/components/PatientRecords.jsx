import styles from "./PatientRecords.module.css";
import { useCallback, useEffect, useState } from "react";
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
        if (res.status === 201) {
          alert("New Patient Added");
        }
        console.log(formData);
        setPatients((patients) => [...patients, formData]);
      } catch (err) {
        console.log(err.message);
      }
      console.log(formData);
      console.log("Submitted");
    } else {
      try {
        const dataToUpdate = formData;
        dataToUpdate.id = patientId;
        console.log(dataToUpdate);
        const res = await fetch("/api/patients", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToUpdate),
        });
        if (res.status === 201) {
          alert("Patient has been updated");
        }

        const updatedPatientObject = patients.find((p) => p.id === patientId);
        const updatedPatientVisits = updatedPatientObject.visit;
        const updatedPatient = formData;
        updatedPatient.visit = updatedPatientVisits;
        const filteredPatients = patients.filter((p) => p.id !== patientId);
        console.log(updatedPatient);
        setPatients([updatedPatient, ...filteredPatients]);
      } catch (err) {
        console.log(err.message);
      }
      console.log(formData);
      console.log("Submitted");
    }
  }

  function closeModal() {
    setpatientId(null);
  }

  function selectPatientId(id) {
    console.log(id);
    setpatientId((patientId) => (id === patientId ? null : id));
  }

  function onSetIsModalOpen() {
    setIsModalOpen(() => !isModalOpen);
  }

  function onPrefilledModalOpen() {
    const patient = patients.find((p) => p.id === patientId);

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

    const filtered = patients.filter(
      (p) =>
        p.first_name.toLowerCase().includes(searchQuery) ||
        p.last_name.toLowerCase().includes(searchQuery)
    );

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
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              placeholder="First Name"
              required
            />
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              placeholder="Last Name"
              required
            />
            {!patientId && (
              <input
                type="text"
                name="date_of_birth"
                value={formData.date_of_birth}
                onChange={handleChange}
                placeholder="12/13/1998"
                required
              />
            )}
            <input
              type="id"
              name="id"
              value={formData.id}
              onChange={handleChange}
              placeholder="12"
              required
            />

            <input
              type="text"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              placeholder="Male/Female/.."
              required
            />
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
            {patientId ? (
              <button type="submit">Update</button>
            ) : (
              <button type="update">Add</button>
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
                first_name={patient.first_name}
                last_name={patient.last_name}
                id={patient.id}
                key={patient.id}
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
