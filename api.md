---
layout: home
---

Alle JSON-Files sind unter dem Base-Path https://tome.zetsuboushii.site/api/ verfügbar.

### actions.json

| Feld      | Typ     | Erklärung                                            |
|-----------|---------|------------------------------------------------------|
| name      | string  | Name der Aktion                                      |
| legendary | boolean | Flag für Legendäre Aktionen                          |
| cooldown  | array   | [ number, string ]; [ 1, "day" ] = 1/day             |
| range     | string  | Anzahl Fuß Reichweite; auch möglich: "20/60"         |
| aoe       | string  | Arten der Schadensauswirkung; "self", "single", etc. |
| hitbonus  | number  | Bonus auf Trefferwurf                                |
| savereq   | array   | [ string, number ]; [ "dex", 17 ]                    |
| damage    | array   | [ [ string, string ] ]; [ [ "3d6", "slashing" ] ]    |
| effects   | array   | [ [ string, string ] ]; [ [ "stunned", "2r" ] ]      |

### characters.json

| Feld           | Typ    | Erklärung                                                                         |
|----------------|--------|-----------------------------------------------------------------------------------|
| name           | string | Name des Charakters                                                               |
| surname        | string | Nachname des Charakters                                                           |
| title          | string | Charaktertitel                                                                    |
| race           | string | Name der Rasse des Charakters                                                     |
| sex            | string | Geschlecht des Charakters                                                         |
| birthday       | string | Geburtstag des Charakters; Tag.Monat.Jahr;<br/>Negative Jahre = vor Zeitreichnung |
| height         | number | Größe des Charakters in Meter                                                     |
| weight         | number | Gewicht des Charakters in kg                                                      |
| bust           | number | Brustumfang des Charakters in cm                                                  |
| underbust      | number | Unterbrustumfang des Charakters in cm                                             |
| waist          | number | Taillenumfang des Charakters in cm                                                |
| hip            | number | Hüftumfang des Charakters in cm                                                   |
| shoulder_width | number | Schulterbreite des Charakters in cm                                               |
| muscle_mass    | number | Muskelmasse des Charakters in kg                                                  |
| functions      | array  | [ string ]; (Berufliche) Funktionen des Charakters                                |
| class          | string | Name der Klasse des Charakters                                                    |
| subclasses     | array  | [ string ]; Namen der Subklassen des Charakters                                   |
| masterclass    | string | Name der Meisterklasse des Charakters                                             |
| homes          | array  | [ string ]; Namen der Heimatorte des Charakters                                   |
| alignment      | string | Gesinnung des Charakters                                                          |
| status         | string | Lebensstatus des Charakters; true/false = lebendig/tot                            |
| relationships  | array  | [ [ string, string ] ]; Namen von Charakteren und deren Beziehung zum Charakter   |
| lover          | string | Name der Liebe des Charakters                                                     |

### data.json

| Feld              | Typ    | Erklärung                               |
|-------------------|--------|-----------------------------------------|
| title             | string | Name der Website                        |
| version           | string | Versionsnummer der Website              |
| currentIngameDate | string | Aktuelles In-game Datum; Tag-Monat-Jahr |

### enemies.json

| Feld        | Typ     | Erklärung                                                          |
|-------------|---------|--------------------------------------------------------------------|
| name        | string  | Name des Gegners                                                   |
| boss        | boolean | Flag für Bosstatus                                                 |
| bosstitle   | string  | Bosstitel des Gegners                                              |
| type        | string  | Gegnertyp                                                          |
| hp          | number  | Zahl der Trefferpunkte                                             |
| movement    | array   | [ string ]; Bewegungsreichweite für Terrain; "60", "schwimmend 40" |
| str         | number  | Stärkemodifikator                                                  |
| dex         | number  | Geschichkeitsmodifikator                                           |
| con         | number  | Konstitutionsmodifikator                                           |
| int         | number  | Intelligenzmodifikator                                             |
| wis         | number  | Weisheitsmodifikator                                               |
| cha         | number  | Charismamodifikator                                                |
| weaknesses  | array   | [ string ]; Schwächen                                              |
| resistances | array   | [ string ]; Resistenzen                                            |
| immunities  | array   | [ string ]; Immunitäten                                            |
| actions     | array   | [ string ]; Namen der Aktionen                                     |

### places.json

| Feld       | Typ    | Erklärung                                                         |
|------------|--------|-------------------------------------------------------------------|
| name       | string | Name des Ortes                                                    |
| subtitle   | string | Untertitel des Ortes                                              |
| supplement | string | Bei-Titel des Ortes                                               |
| natlang    | array  | [ string, string ]; Name des Ortes in Landessprache + Übersetzung |
| demography | number | Anzahl der Einwohner                                              |
| hasInit    | array  | [ string ]; Namen der unterliegenden Orte                         |
| placetype  | string | Typ des Ortes                                                     |
| system     | string | Politisches System                                                |
| leader     | array  | [ string, string ]; Politisches Oberhaupt + Amtstitel             |
| capital    | string | Name der Hauptstadt                                               |

### races.json

| Feld    | Typ    | Erklärung                                                   |
|---------|--------|-------------------------------------------------------------|
| name    | string | Name der Rasse                                              |
| ageavg  | number | Durchschnittliche Lebenserwartung in Jahren; -1 = unendlich |
| domains | array  | [ string ]; Hauptdomänen der Rasse                          |

### weapons.json

| Feld          | Typ    | Erklärung                                     |
|---------------|--------|-----------------------------------------------|
| name          | string | Name der Waffe                                |
| type          | string | Waffentyp                                     |
| prerequisites | array  | [ string, string ]; Voraussetzungen für Waffe |
| range         | number | Reichweite in Fuß                             |
| range_far     | number | Wurf-/Lange Reichweite in Fuß                 |
| damage        | array  | [ string, string ]; Schadenswürfe für Waffe   |
| abilities     | array  | [ string ]; Namen der Fähigkeiten der Waffe   |

### effects.json

| Feld   | Typ    | Erklärung                                           |
|--------|--------|-----------------------------------------------------|
| name   | string | Name des Effekts                                    |
| rating | number | Bewertung der Effektivität/Stärke auf Skala 1 bis 5 |