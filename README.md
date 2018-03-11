# GI4Society

## Requirements
Requires 
 - nodejs
 - bower
 - mongoDB

## Install & Run
1. Clone or download this repository
2. `npm install`
3. `bower install`
4. `npm start`

Platform runs on `localhost:8080`. 

## Description of newly created vocabularies

### http://vocab.demographics.de/DistrictPolygon

Name: DistrictPolygon  
Meaning: A polygon for a given geographical district  
Domain: http://geovocab.org/geometry#Polygon  
Range: http://www.w3.org/2000/10/swap/log#String

### http://vocab.demographics.de/AverageHouseHoldSize

Name: AverageHouseholdSize  
Meaning: Describes the average number of persons per household for a given geographical area  
Domain: http://vocab.demographics.de/District  
Range: float

### http://vocab.demographics.de/Age_0-19

Name: Age_0-19  
Meaning: Describes the proportion of population within the age range of 0 to 19 years  
Domain: http://vocab.demographics.de/District  
Range: float

### http://vocab.demographics.de/Age_20-39

Name: Age_20-39  
Meaning: Describes the proportion of population within the age range of 20 to 39 years  
Domain: http://vocab.demographics.de/District  
Range: float

### http://vocab.demographics.de/Age_20-39

Name: Age_20-39  
Meaning: Describes the proportion of population within the age range of 20 to 39 years  
Domain: http://vocab.demographics.de/District  
Range: float

### http://vocab.demographics.de/Age_40-59

Name: Age_40-59  
Meaning: Describes the proportion of population within the age range of 40 to 59 years  
Domain: http://vocab.demographics.de/District  
Range: float

### http://vocab.demographics.de/Age_60-79

Name: Age_60-79  
Meaning: Describes the proportion of population within the age range of 60 to 79 years  
Domain: http://vocab.demographics.de/District  
Range: float

### http://vocab.demographics.de/Age_80-inf

Name: Age_80-inf  
Meaning: Describes the proportion of population within the age range of 80 to infinite  
Domain: http://vocab.demographics.de/District  
Range: float

### http://vocab.demographics.de/ProportionCitizenship

Name: ProportionCitizenship  
Meaning: Describes the proportion of the population with a citizenship of the respective country of which data accounts for  
Domain: http://vocab.demographics.de/District  
Range: float

### http://vocab.demographics.de/AverageMonthlyRentalPrice

Name: AverageMonthlyRentalPrice  
Meaning: Describes the average monthly rental price for housing per m2  
Domain: http://vocab.demographics.de/District  
Range: float


## License

This code is licensed under the GNU GENERAL PUBLIC LICENSE version 3 (GNU GPL v3). For more information see License file.

Copyright(C) 2018 Jan Suleiman
