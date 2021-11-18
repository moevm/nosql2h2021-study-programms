FROM mcr.microsoft.com/dotnet/sdk:5.0-alpine as build

WORKDIR /build
COPY . . 

RUN dotnet publish --configuration Release -o publish

FROM mcr.microsoft.com/dotnet/aspnet:5.0-alpine

COPY --from=build /build/publish /application

WORKDIR /application

CMD dotnet StudyProgramms.Web.dll
