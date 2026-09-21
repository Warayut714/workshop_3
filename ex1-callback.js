const students = [
  { id: "1001", name: "Alice", major: "CE", score: 85 },
  { id: "1002", name: "Bob", major: "IT", score: 45 },
  { id: "1003", name: "Charlie", major: "CE", score: 72 },
  { id: "1004", name: "David", major: "IT", score: 68 }
];

function fetchStudentById(id, callback) {
  if (typeof id !== "string" || id.trim() === "") {
    return callback(new Error("รหัสนักศึกษาไม่ถูกต้อง"));
  }

  setTimeout(() => {
    const student = students.find((s) => s.id === id);
    if (!student) {
      return callback(new Error(`ไม่พบรหัสนักศึกษา ${id}`));
    }
    return callback(null, { ...student });
  }, 300);
}
