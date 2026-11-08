"use strict";

//select all documents id
const form = document.getElementById("gradeForm");
const stundentNameInput = document.getElementById("studentName");
const nimInput = document.getElementById("nim");
const task1Input = document.getElementById("task1");
const task2Input = document.getElementById("task2");
const task3Input = document.getElementById("task3");
const report = document.getElementById("report");
const feedback = document.getElementById("feedback");
const history = document.getElementById("history");

//calculate grade
function calculateAverage(score1, score2, score3){
    return (score1 + score2 + score3) / 3;
}

//determining grades (SUDAH DISESUAIKAN DENGAN STANDAR UNAI)
function determineGrade(average){
    // Aturan tugas: bulatkan ke nilai terdekat dulu
    const roundedAvg = Math.round(average); 
    
    if(roundedAvg >= 96) return { grade: "A", point: "4.00" };
    if(roundedAvg >= 90) return { grade: "A-", point: "3.67" };
    if(roundedAvg >= 86) return { grade: "B+", point: "3.33" };
    if(roundedAvg >= 80) return { grade: "B", point: "3.00" };
    if(roundedAvg >= 76) return { grade: "B-", point: "2.67" };
    if(roundedAvg >= 70) return { grade: "C+", point: "2.33" };
    if(roundedAvg >= 65) return { grade: "C", point: "2.00" };
    if(roundedAvg >= 60) return { grade: "C-", point: "1.67" };
    if(roundedAvg >= 55) return { grade: "D+", point: "1.33" };
    if(roundedAvg >= 50) return { grade: "D", point: "1.00" };
    return { grade: "F", point: "0.00" };
}

//VALIDATING user input
function isValidScore(rawValue){
    if(rawValue.trim() === ""){
        return false;
    }

    const score = Number(rawValue);
    return Number.isFinite(score) &&
    score >= 0 &&
    score <= 100;
}

form.addEventListener("submit", function(event){
    event.preventDefault();

    const studentName = stundentNameInput.value.trim();
    const nim = nimInput.value.trim();
    const raw1 = task1Input.value;
    const raw2 = task2Input.value;
    const raw3 = task3Input.value;

    if(
        studentName === "" ||
        nim === "" ||
        !isValidScore(raw1) ||
        !isValidScore(raw2) ||
        !isValidScore(raw3)
    ){
        feedback.textContent = "Please enter valid informations";
        feedback.classList.remove("success");
        feedback.classList.add("error");
        feedback.classList.remove("hidden");
        return;
    }

    const score1 = Number(raw1);
    const score2 = Number(raw2);
    const score3 = Number(raw3);
    const average = calculateAverage(score1, score2, score3);
    const unaiGrade = determineGrade(average);

    document.getElementById("resultName").textContent = "Name: " + studentName;
    document.getElementById("resultNIM").textContent = "NIM: " + nim;
    document.getElementById("resultAverage").textContent = "Average: " + average.toFixed(2);
    
    // Menampilkan Letter Grade beserta Grade Point-nya
    document.getElementById("resultGrade").textContent = "Grade: " + unaiGrade.grade + " (" + unaiGrade.point + ")";

    // Mengosongkan baris remark karena instruksi meminta fitur ini dihapus
    const remarkElement = document.getElementById("resultRemark");
    if(remarkElement){
        remarkElement.textContent = ""; 
    }

    report.classList.remove("hidden");
    feedback.textContent = "Calculate completed";
    feedback.classList.remove("error");
    feedback.classList.add("success");
    feedback.classList.remove("hidden");

    // FITUR HISTORY: Menambahkan hasil perhitungan ke dalam daftar history
    const historyItem = document.createElement("li");
    historyItem.textContent = studentName + " (" + nim + ") - Avg: " + average.toFixed(2) + " - Grade: " + unaiGrade.grade;
    history.appendChild(historyItem);
});