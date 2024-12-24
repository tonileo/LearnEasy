# LearnEasy

## Technologies

- **Back-end**: ASP.NET Core Web API (.NET 8)
- **Front-end**: Angular 18
- **Database**: Microsoft SQL Server
- **Authentication**: ASP.NET Identity

## Setup and Installation

### Prerequisites
- [.NET 8 SDK](https://dotnet.microsoft.com/download)
- NodeJS (at least v20.11.1)

### Installation Steps
1. **Clone the repository**:
   ```bash
   git clone https://github.com/tonileo/LearnEasy.git
   
2. **Navigate to the project directory**:
   ```bash
   cd LearnEasy

3. **Restore the required packages**:
   ```bash
   dotnet restore

4. **Set up the database and run the backend side**:
   - Update the connection string in appsettings.json (inside WebApi) to point to your SQL Server instance.
   - Apply migrations to set up the database schema:
  
   ~~~ bash
   cd WebApi
   ~~~
   ~~~ bash
   dotnet ef database update
   ~~~

5. **Install Angular dependencies**:
   - Run the following command from the project root (LearnEasy):
  
   ~~~ bash
   cd client
   ~~~
   ~~~ bash
   npm install
   ~~~

6. **Run the app**:
   - Run the frontend side (from the project root LearnEasy):

   ~~~ bash
   cd client
   ~~~
   ~~~ bash
   ng serve
   ~~~ 

   - Run the backend side in new console (from the project root LearnEasy):
 
   ~~~ bash
   cd WebApi
   ~~~
   ~~~ bash
   dotnet watch
   ~~~

6. **Access the app**:
   - Open your browser and navigate to https://localhost:4200.
