# Use the official .NET SDK image for building the project
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

# Copy the .csproj file and restore dependencies as a separate layer
COPY *.csproj ./
RUN dotnet restore

# Copy the remaining project files and build the application
COPY . .
RUN dotnet publish -c Release -o out

# Use the official runtime image for running the app
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/out .

FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf

# Set environment variables (optional)
ENV ASPNETCORE_URLS=http://+:80
EXPOSE 80

# Run the application
ENTRYPOINT ["dotnet", "CustomFormApp.Server.dll"]
