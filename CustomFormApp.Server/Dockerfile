# Use the official .NET SDK image for building the project
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

# Set the working directory inside the Docker container
WORKDIR /app

# Copy the .csproj file from the server folder to the build context
COPY CustomFormApp.Server/CustomFormApp.Server.csproj ./

# Restore dependencies
RUN dotnet restore

# Copy the remaining source code from the server directory
COPY CustomFormApp.Server/. ./

# Publish the application
RUN dotnet publish -c Release -o /app/out

# Use the official runtime image for running the app
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app

# Copy the published output from the build stage to the runtime stage
COPY --from=build /app/out .

# Set environment variables (optional)
ENV ASPNETCORE_URLS=http://+:80
EXPOSE 80

# Run the application
ENTRYPOINT ["dotnet", "CustomFormApp.Server.dll"]
