import * as json_data from './cleaned_data.json';
export const data = json_data.default;


export const _data = data;

// Erstellen von Arrays mit einzigartigen Werten für verschiedene Kategorien
let themengebieteData = [];
let faecherData = [];
let unterfaecherData = [];
let personenData = [];
let schlagwoerterData = [];


data.forEach(entry => {
    themengebieteData.push(entry.Hauptthema);

    entry.Unterthemen.forEach(ut => {
        faecherData.push(ut.Unterthema);
        console.log(ut)
        ut["Unter-Unterthemen"].forEach(uut => {
            unterfaecherData.push(uut["Name"]);

            uut.Professoren.forEach(prof => {
                personenData.push(prof.Name);

                prof.Schlagworte.forEach(schlagwort => {
                    schlagwoerterData.push(schlagwort);
                });
            });
        });
    });
});

console.log("hello");
console.log(unterfaecherData);

export const themengebieteArray = [...new Set(themengebieteData)];
export const faecherArray = [...new Set(faecherData)];
export const unterFaecherArray = [...new Set(unterfaecherData)];
export const personenArray = [...new Set(personenData)];
export const schlagwoerterArray = [...new Set(schlagwoerterData)];