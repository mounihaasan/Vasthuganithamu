function calculate() {
    let aa = parseInt(document.getElementById("aa").value) || 0;
    let bb = parseInt(document.getElementById("bb").value) || 0;
    let cc = parseInt(document.getElementById("cc").value) || 0;
    let dd = parseInt(document.getElementById("dd").value) || 0;
    let vv = parseInt(document.getElementById("vv").value) || 0;
    let xx = parseInt(document.getElementById("xx").value) || 0;
    let yy = parseInt(document.getElementById("yy").value) || 0;
    let zz = parseInt(document.getElementById("zz").value) || 0;
    let oo = parseInt(document.getElementById("oo").value) || 0;

    if (oo < 1 || oo > 27) {
        alert("Nakshatram should be between 1 and 27.");
        return;
    }

    let a = (aa * 12) + bb;
    let b = (cc * 12) + dd;
    let c = (vv * 12) + xx;
    let d = (yy * 12) + zz;
    
    let selected_values = [];
    document.querySelectorAll("input[type=checkbox]:checked").forEach(checkbox => {
        selected_values.push(checkbox.value); 
    });

    let outputDiv = document.getElementById("output");
    outputDiv.innerHTML = "";

    let count = 0;

    for (let e = a; e <= b; e++) {
        for (let f = c; f <= d; f++) {
            let area = (e * f) / 144;
            let feetE = Math.floor(e / 12), inchE = e % 12;
            let feetF = Math.floor(f / 12), inchF = f % 12;
            let values = {};

            if (selected_values.includes("nak")) values["nak"] = Math.ceil((area * 8) % 27) || 27;
            if (selected_values.includes("aysh")) values["aysh"] = Math.ceil((area * 9) % 120) || 120;
            if (selected_values.includes("adym")) values["adym"] = Math.ceil((area * 8) % 12) || 12;
            if (selected_values.includes("karch")) values["karch"] = Math.ceil((area * 3) % 8) || 8;
            if (selected_values.includes("tidhi")) values["tidhi"] = Math.ceil((area * 6) % 30) || 30;

            // Condition checks
            if (selected_values.includes("nak") && ![0, 1, 10, 19, 2, 11, 20, 4, 13, 22, 6, 15, 24, 8, 17, 26,
                -1, -10, -19, -3, -12, -21, -5, -14, -23, -7, -16, -25, -8, -17, -26].includes(oo - values["nak"])) continue;
            
            if (selected_values.includes("adym") && selected_values.includes("karch")) {
                let o = values["adym"] - values["karch"];
                if (o <= 1) continue;
            }

            count++;
            outputDiv.innerHTML += `(${feetE}ft ${inchE}in × ${feetF}ft ${inchF}in) Area: ${area.toFixed(2)} sq.ft -> `;
            outputDiv.innerHTML += selected_values.map(val => `${val}: ${values[val] || "-"}`).join(", ") + "<br>";
        }
    }

    if (count === 0) outputDiv.innerHTML = "No valid results found.";
}

function clearFields() {
    document.querySelectorAll("input[type=text], input[type=number]").forEach(input => input.value = "");
    document.querySelectorAll("input[type=checkbox]").forEach(checkbox => checkbox.checked = false);
    document.getElementById("output").innerHTML = "";
}
