const wait = (ms, value, willFail = false) =>
  new Promise((resolve, reject) => {
    setTimeout(() => (willFail ? reject(new Error(`${value} ล้มเหลว`)) : resolve(value)), ms);
  });
const timeoutPromise = (ms) =>
  new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Timeout")), ms)
  );

async function main() {=
  console.log("--- สถานการณ์ที่ 1 ---");

  try {
    const res1 = await Promise.all([
      wait(300, "โปรไฟล์"),
      wait(400, "ตารางเรียน"),
      wait(500, "ประกาศ")
    ]);
    console.log(`เปิดหน้าแรก: ${res1.join(", ")}`);
  } catch (err) {
    console.log(`หน้าแรกเปิดไม่ได้: ${err.message}`);
  }

  try {
    const res1Fail = await Promise.all([
      wait(300, "โปรไฟล์"),
      wait(400, "ตารางเรียน"),
      wait(500, "ประกาศ", true)
    ]);
    console.log(`เปิดหน้าแรก: ${res1Fail.join(", ")}`);
  } catch (err) {
    console.log(`หน้าแรกเปิดไม่ได้: ${err.message}`);
  }

  console.log("\n--- สถานการณ์ที่ 2 ---");
  const results2 = await Promise.allSettled([
    wait(300, "อีเมล"),
    wait(500, "SMS", true),
    wait(400, "แอป")
  ]);
  
  results2.forEach((result) => {
    if (result.status === "fulfilled") {
      console.log(`ส่งสำเร็จ: ${result.value}`);
    } else {
      console.log(`ส่งไม่สำเร็จ: ${result.reason.message}`);
    }
  });
  console.log("\n--- สถานการณ์ที่ 3 ---");
  try {
    const res3 = await Promise.any([
      wait(300, "mirror-A", true),
      wait(600, "mirror-B")
    ]);
    console.log(`ใช้ข้อมูลจาก: ${res3}`);
  } catch (err) {
    console.log(`ไม่มี Server ใดตอบรับ: ${err.message}`);
  }

  console.log("\n--- สถานการณ์ที่ 4 ---");
  try {
    const res4 = await Promise.race([
      wait(1200, "ฐานข้อมูล"),
      timeoutPromise(800)
    ]);
    console.log(`ค้นหาสำเร็จ: ${res4}`);
  } catch (err) {
    console.log("ใช้แคชเก่าแทน");
  }
}

main();