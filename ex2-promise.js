const students = [
  { id: "6501", name: "Alice", major: "CE", score: 85 },
  { id: "6502", name: "Bob", major: "IT", score: 45 },
  { id: "6503", name: "Charlie", major: "CE", score: 72 },
  { id: "6504", name: "David", major: "IT", score: 68 }
];

const toGrade = (score) => {
  if (score >= 80) return "A";
  if (score >= 75) return "B+";
  if (score >= 70) return "B";
  if (score >= 65) return "C+";
  if (score >= 60) return "C";
  if (score >= 55) return "D+";
  if (score >= 50) return "D";
  return "F";
};
function fetchStudentByIdAsync(id) {
  return new Promise((resolve, reject) => {
    if (typeof id !== "string" || id.trim() === "") {
      return reject(new Error("รหัสนักศึกษาไม่ถูกต้อง"));
    }

    setTimeout(() => {
      const student = students.find((s) => s.id === id);

      if (!student) {
        return reject(new Error(`ไม่พบรหัสนักศึกษา ${id}`));
      }

      return resolve({ ...student });
    }, 300);
  });
}

fetchStudentByIdAsync("6501")
  .then((student) => console.log("กรณี ก (พบ):", student))
  .catch((err) => console.error("กรณี ก Error:", err.message))
  .finally(() => console.log("กรณี ก: ทำงานเสร็จสิ้น"));

fetchStudentByIdAsync("9999")
  .then((student) => console.log("กรณี ข (พบ):", student))
  .catch((err) => console.error("กรณี ข Error:", err.message))
  .finally(() => console.log("กรณี ข: ทำงานเสร็จสิ้น"));

fetchStudentByIdAsync(42)
  .then((student) => console.log("กรณี ค (พบ):", student))
  .catch((err) => console.error("กรณี ค Error:", err.message))
  .finally(() => console.log("กรณี ค: ทำงานเสร็จสิ้น"));

setTimeout(() => {
  fetchStudentByIdAsync("6501")
    .then((student) => {
      return {
        name: student.name,
        grade: toGrade(student.score)
      };
    })
    .then((result) => {
      return `นักศึกษา: ${result.name} ได้รับเกรด: ${result.grade}`;
    })
    .then((reportMessage) => {
      console.log("[Report]:", reportMessage);
      return reportMessage;
    })
    .catch((err) => console.error("Chaining Error:", err.message));
}, 500);

function promisify(fn) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      fn(...args, (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      });
    });
  };
}

function multiplyAsyncCallback(a, b, callback) {
  setTimeout(() => {
    if (typeof a !== "number" || typeof b !== "number") {
      return callback(new Error("พารามิเตอร์ต้องเป็นตัวเลขเท่านั้น"));
    }
    return callback(null, a * b);
  }, 200);
}

const multiplyAsync = promisify(multiplyAsyncCallback);

setTimeout(() => {
  multiplyAsync(5, 4)
    .then((res) => console.log("Promisify Success:", res))
    .catch((err) => console.error("Promisify Error:", err.message));

  multiplyAsync(5, "invalid")
    .then((res) => console.log("Promisify Success:", res))
    .catch((err) => console.error("Promisify Error:", err.message));
}, 1000);