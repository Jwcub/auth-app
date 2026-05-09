# Laboration 1: Autentisering i webbtjänst

Detta projekt är en webbtjänst byggd för att hantera användarautentisering, registrering och sessionshantering med hjälp av JSON Web Tokens (JWT). Projektet är skapat i kursen Backend-baserad webbutveckling vid Mittuniversitetet. 

## Funktionalitet
Följande funktionalitet är implementerad i applikationen:
* **Skapa användarkonto:** Användare kan registrera sig med ett unikt användarnamn och lösenord.
* **Inloggning:** Verifiering av användaruppgifter och utfärdande av JWT.
* **Sessionshantering:** Användning av JWT för att bibehålla en session och autentisera anrop.
* **Skyddat data:** En route kräver en giltig token för att returnera data från databasen.
* **Lösenordshantering:** Alla lösenord hashas innan de sparas i databasen.

## Teknikstack
* **Runtime:** Node.js
* **Ramverk:** Express.js
* **Databas:** Mongodb
* **Autentisering:** JSON Web Token (JWT)
* **Kryptering:** Bcrypt

## Säkerhet
För att skydda användarnas integritet och systemets säkerhet tillämpas följande:
1.  **Lösenordshashning:** Applikationen använder en saltad hash-algoritm för att se till att lösenord aldrig lagras i klartext.
2.  **JWT-validering:** Den skyddade routen kontrollerar inkommande `Authorization`-headers för en giltig `Bearer`-token.
3.  **Felmeddelanden:** Vid misslyckad autentisering returneras specifika statuskoder (t.ex. 401 Unauthorized) för att förhindra obehörig åtkomst.

## Installation

1. Klona detta repository:
   ```bash
   git clone https://github.com/Jwcub/auth-app
   ````
2. Installera nödvändiga moduler:
    ``` bash 
    npm install
    ````
3. Skapa en .env-fil i rotmappen och lägg till dina konfigurationsinställningar (t.ex. JWT_SECRET och databas-URL).

4. Starta applikationen:
     ``` bash 
    npm start
    ````

## API-Dokumentation (Endpoints)

Nedan beskrivs tillgängliga resurser och hur de används för CRUD-operationer och autentisering.

### Publika endpoints
Dessa kan anropas utan att vara inloggad.

| Metod | URI | Beskrivning | Body (JSON) |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/register` | Skapar ett nytt konto. Lösenordet hashas innan lagring. | `username`, `password` |
| `POST` | `/api/login` | Verifierar användare och returnerar en JWT vid lyckad inloggning. | `username`, `password` |

### Skyddade endpoints (Kräver JWT)
För att nå dessa resurser måste en giltig token skickas med i HTTP-headern enligt formatet:  
`Authorization: Bearer <din_jwt_token>`

| Metod | URI | Beskrivning | Krav |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/admin` | Returnerar skyddad data från databasen. | Giltig JWT |


## Databasstruktur

Användarinformationen lagras i MongoDB med följande schema:

| Fält | Typ | Beskrivning |
| :--- | :--- | :--- |
| `username` | String | Unikt användarnamn för identifiering. |
| `password` | String | Hashat lösenord (lagras aldrig i klartext). |
| `created` | Date | Datum och tid då kontot skapades. |

## Felhantering

Om en användare försöker nå en skyddad resurs utan giltig token eller med en utgången token, returnerar tjänsten följande:

- **Statuskod:** `401 Unauthorized`
- **Respons:** `{"message": "Du saknar behörighet för att komma åt innehåll" / "Ogiltig token" }`

---

Frontend-applikation tillgänglig vid: 
[https://github.com/Jwcub/auth_frontend](https://github.com/Jwcub/auth_frontend)