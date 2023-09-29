document.getElementById('infoForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Sustabdomas formos įprastas submit veikimas

    const name = document.getElementById('name').value;

    // API užklausos
    fetch(`https://api.agify.io?name=${name}`)
        .then(response => response.json())
        .then(data => {
            const age = data.age;

            fetch(`https://api.nationalize.io?name=${name}`)
                .then(response => response.json())
                .then(data => {
                    const country = data.country[0].country_id;

                    fetch(`https://api.genderize.io?name=${name}`)
                        .then(response => response.json())
                        .then(data => {
                            const gender = data.gender;

                            // Atvaizduojame gautą informaciją
                            const resultDiv = document.getElementById('result');
                            resultDiv.innerHTML = `
                                <p>Vardas: ${name}</p>
                                <p>Amžius: ${age}</p>
                                <p>Tautybė: ${country}</p>
                                <p>Lytis: ${gender}</p>
                            `;
                        })
                        .catch(error => console.error('Klaida gauti lytį:', error));
                })
                .catch(error => console.error('Klaida gauti tautybę:', error));
        })
        .catch(error => console.error('Klaida gauti amžių:', error));
});
