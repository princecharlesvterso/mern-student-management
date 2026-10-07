import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [age, setAge] = useState("");
  const [editingId, setEditingId] = useState(null);

  const getStudents = () => {
    axios
      .get("http://localhost:5000/students")
      .then((response) => {
        setStudents(response.data);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/students")
      .then((response) => {
        setStudents(response.data);
      });

  }, []);

  const addStudent = () => {
    if (name === "" || course === "" || age === "") {
      alert("Please fill in all fields");
      return;
    }

    axios
      .post("http://localhost:5000/students", {
        name,
        course,
        age,
      })
      .then(() => {
        getStudents();
        clearForm();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const deleteStudent = (id) => {
    axios
      .delete(`http://localhost:5000/students/${id}`)
      .then(() => {
        getStudents();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const editStudent = (student) => {
    setEditingId(student._id);

    setName(student.name);
    setCourse(student.course);
    setAge(student.age);
  };

  const updateStudent = () => {
    axios
      .put(`http://localhost:5000/students/${editingId}`, {
        name,
        course,
        age,
      })
      .then(() => {
        getStudents();
        clearForm();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const clearForm = () => {
    setName("");
    setCourse("");
    setAge("");
    setEditingId(null);
  };

  return (
    <div>

      <h1>Student Management System</h1>
      <h2>{editingId ? "Edit Student" : "Add Student"}</h2>

      <div>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <br /> <br />
        <input type="text" placeholder="Course" value={course} onChange={(e) => setCourse(e.target.value)} />
        <br /> <br />
        <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />
        <br /> <br />

        {editingId ? (
          <>
            <button type="button" onClick={updateStudent}>Update Student</button>

            <button type="button" onClick={clearForm}>Cancel</button>
          </>
        ) : (
          <button type="button" onClick={addStudent}>Add Student</button>
        )}
      </div>

      <h2>Students</h2>

      {students.map((student) => (
        <div key={student._id}>
          <p>Name: {student.name}</p>
          <p>Course: {student.course}</p>
          <p>Age: {student.age}</p>

          <button type="button" onClick={() => editStudent(student)}>
            Edit
          </button>

          <button type="button" onClick={() => deleteStudent(student._id)}>
            Delete
          </button>

          <hr />
        </div>
      ))}
    </div>

  );
}

export default App;