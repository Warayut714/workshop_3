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
async function reportSequential() {
  const ids = ["6501", "6502", "6503"];
  const start = Date.now();

  for (const id of ids) {
    await fetchStudentByIdAsync(id);
  }

  const duration = Date.now() - start;
  console.log(`[Sequential] ใช้เวลา: ${duration} ms`);
  return duration;
}
async function reportParallel(seqTime) {
  const ids = ["6501", "6502", "6503"];
  const start = Date.now();

  await Promise.all(ids.map((id) => fetchStudentByIdAsync(id)));

  const duration = Date.now() - start;
  const speedup = (seqTime / duration).toFixed(2);

  console.log(`[Parallel] ใช้เวลา: ${duration} ms (เร็วกว่าแบบ Sequential ${speedup} เท่า)`);
}
async function safeReport(id) {
  try {
    const student = await fetchStudentByIdAsync(id);
    console.log(`พบข้อมูล: ${student.name} (เกรด ${toGrade(student.score)})`);
  } catch (err) {
    console.log(`ตรวจไม่พบ: ${err.message}`);
  } finally {
    console.log(`-- จบการตรวจสอบ ${id} --`);
  }
}
async function main() {
  console.log("=== เริ่มการทดสอบ Workshop 3 ข้อ 3 ===");

  console.log("\n--- ส่วนที่ 1 & 2: Sequential vs Parallel ---");
  const seqTime = await reportSequential();
  await reportParallel(seqTime);

  console.log("\n--- ส่วนที่ 3: safeReport (พบข้อมูล และ ไม่พบข้อมูล) ---");
  await safeReport("6501");
  await safeReport("9999");
}

main();