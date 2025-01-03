import {IReview, Review} from "../../models";

const reviewerId = 'user_2qMCwflcPjsmCdBexwZZXcmAEuR';

const  reviewSeeds = [
    {
        reviewerId: reviewerId,
        title: "Great Location but Noisy",
        recommend: 4,
        description: "The area is fantastic for access to public transport, but the noise levels can get quite high.",
        location: { type: 'Point', coordinates: [26.0978, 44.4285] },
        areaFeedback: {
            transport: {
                publicTransport: 5,
                carTransport: 3,
                trafficCongestion: 2,
                primaryTransportMode: "Public Transport",
                additionalComments: "Trams are frequent and reliable.",
            },
            demographics: {
                predominantDemographic: "Young professionals",
            },
            safetyAndNoise: {
                noiseLevel: 3,
                nighttimeSafety: 4,
            },
            environmentalFactors: {
                cleanliness: 4,
                greenSpaces: 3,
                pollutionLevels: 3,
            },
        },
        buildingFeedback: {
            pestIssues: {
                rodents: 1,
                bugs: 2,
                mosquitoes: 3,
                additionalComments: "Occasionally, mosquitoes in summer.",
            },
            utilityAvailability: {
                frequency: 5,
                centralHeating: true,
                additionalComments: "No outages experienced.",
            },
            moldIssues: {
                severity: 1,
                additionalComments: "No visible mold.",
            },
            noiseInsulation: {
                rating: 2,
                additionalComments: "Thin walls, you can hear neighbors.",
            },
            security: {
                rating: 4,
                frequency: 3,
                bodyguard: false,
                additionalComments: "Gated entrance provides safety.",
            },
            hvac: {
                summer: 4,
                winter: 5,
                ac: true,
                additionalComments: "The AC works well during hot days.",
            },
            buildingFinishes: {
                quality: 3,
                modernity: 4,
                additionalComments: "Some modern upgrades, but could use better finishing.",
            },
        },
        createdAt: new Date("2024-01-01T10:00:00Z"),
        updatedAt: new Date("2024-01-01T10:00:00Z"),
    },
    {
        reviewerId: reviewerId,
        title: "Quiet Neighborhood with Great Green Spaces",
        recommend: 5,
        description: "Perfect for families and those looking for tranquility.",
        location: { type: 'Point', coordinates: [26.0861, 44.4715] },
        areaFeedback: {
            transport: {
                publicTransport: 4,
                carTransport: 4,
                trafficCongestion: 3,
                primaryTransportMode: "Car",
                additionalComments: "Parking is generally available.",
            },
            demographics: {
                predominantDemographic: "Families",
            },
            safetyAndNoise: {
                noiseLevel: 5,
                nighttimeSafety: 5,
            },
            environmentalFactors: {
                cleanliness: 5,
                greenSpaces: 5,
                pollutionLevels: 2,
            },
        },
        buildingFeedback: {
            pestIssues: {
                rodents: 1,
                bugs: 1,
                mosquitoes: 1,
                additionalComments: "No pest issues noticed.",
            },
            utilityAvailability: {
                frequency: 5,
                centralHeating: true,
                additionalComments: "Consistent heating throughout winter.",
            },
            moldIssues: {
                severity: 1,
                additionalComments: "No mold in the apartment.",
            },
            noiseInsulation: {
                rating: 5,
                additionalComments: "Very quiet indoors.",
            },
            security: {
                rating: 5,
                frequency: 5,
                bodyguard: false,
                additionalComments: "24/7 security personnel on site.",
            },
            hvac: {
                summer: 5,
                winter: 5,
                ac: true,
                additionalComments: "Efficient cooling and heating system.",
            },
            buildingFinishes: {
                quality: 5,
                modernity: 5,
                additionalComments: "Modern and high-quality finishes.",
            },
        },
        createdAt: new Date("2024-02-01T12:30:00Z"),
        updatedAt: new Date("2024-02-01T12:30:00Z"),
    },

    {
        reviewerId,
        title: "Vibrant Neighborhood, Great Access",
        recommend: 4,
        description: "Fantastic for nightlife and activities, but parking is difficult.",
        location: { type: "Point", coordinates: [26.0000, 44.4285] },
        areaFeedback: {
            transport: {
                publicTransport: 5,
                carTransport: 2,
                trafficCongestion: 1,
                primaryTransportMode: "Public Transport",
                additionalComments: "Public transport is a lifesaver here.",
            },
            demographics: {
                predominantDemographic: "Young professionals",
            },
            safetyAndNoise: {
                noiseLevel: 3,
                nighttimeSafety: 4,
            },
            environmentalFactors: {
                cleanliness: 4,
                greenSpaces: 2,
                pollutionLevels: 3,
            },
        },
        buildingFeedback: {
            pestIssues: {
                rodents: 2,
                bugs: 3,
                mosquitoes: 4,
                additionalComments: "Occasional bug problems in summer.",
            },
            utilityAvailability: {
                frequency: 5,
                centralHeating: true,
                additionalComments: "Stable utilities.",
            },
            moldIssues: {
                severity: 1,
                additionalComments: "No issues noticed.",
            },
            noiseInsulation: {
                rating: 2,
                additionalComments: "Can hear neighbors often.",
            },
            security: {
                rating: 3,
                frequency: 4,
                bodyguard: false,
                additionalComments: "Good security for an urban area.",
            },
            hvac: {
                summer: 4,
                winter: 5,
                ac: true,
                additionalComments: "Works well in all seasons.",
            },
            buildingFinishes: {
                quality: 3,
                modernity: 4,
                additionalComments: "Modern appliances but slightly dated decor.",
            },
        },
        createdAt: new Date("2024-01-15T09:00:00Z"),
        updatedAt: new Date("2024-01-15T09:00:00Z"),
    },
    {
        reviewerId,
        title: "Quiet and Family-Friendly",
        recommend: 5,
        description: "Ideal for families, with parks and schools nearby.",
        location: { type: "Point", coordinates: [26.0861, 44.4500] },
        areaFeedback: {
            transport: {
                publicTransport: 4,
                carTransport: 5,
                trafficCongestion: 3,
                primaryTransportMode: "Car",
                additionalComments: "Traffic congestion can occur during peak hours.",
            },
            demographics: {
                predominantDemographic: "Families",
            },
            safetyAndNoise: {
                noiseLevel: 5,
                nighttimeSafety: 5,
            },
            environmentalFactors: {
                cleanliness: 5,
                greenSpaces: 5,
                pollutionLevels: 1,
            },
        },
        buildingFeedback: {
            pestIssues: {
                rodents: 1,
                bugs: 1,
                mosquitoes: 2,
                additionalComments: "Clean and well-maintained.",
            },
            utilityAvailability: {
                frequency: 5,
                centralHeating: true,
                additionalComments: "Never experienced outages.",
            },
            moldIssues: {
                severity: 1,
                additionalComments: "No signs of dampness or mold.",
            },
            noiseInsulation: {
                rating: 5,
                additionalComments: "Super quiet inside.",
            },
            security: {
                rating: 5,
                frequency: 5,
                bodyguard: false,
                additionalComments: "Highly secure, with CCTV cameras.",
            },
            hvac: {
                summer: 5,
                winter: 5,
                ac: true,
                additionalComments: "Efficient and reliable system.",
            },
            buildingFinishes: {
                quality: 5,
                modernity: 5,
                additionalComments: "Brand-new finishes with modern aesthetics.",
            },
        },
        createdAt: new Date("2024-02-01T12:30:00Z"),
        updatedAt: new Date("2024-02-01T12:30:00Z"),
    },
    {
        reviewerId,
        title: "Convenient but Crowded",
        recommend: 3,
        description: "A busy area with great amenities but lots of traffic.",
        location: { type: "Point", coordinates: [26.0808, 44.4000] },
        areaFeedback: {
            transport: {
                publicTransport: 5,
                carTransport: 3,
                trafficCongestion: 2,
                primaryTransportMode: "Walking",
                additionalComments: "Everything is within walking distance.",
            },
            demographics: {
                predominantDemographic: "Students and professionals",
            },
            safetyAndNoise: {
                noiseLevel: 2,
                nighttimeSafety: 4,
            },
            environmentalFactors: {
                cleanliness: 3,
                greenSpaces: 2,
                pollutionLevels: 4,
            },
        },
        buildingFeedback: {
            pestIssues: {
                rodents: 3,
                bugs: 2,
                mosquitoes: 3,
                additionalComments: "Occasionally spotted pests.",
            },
            utilityAvailability: {
                frequency: 4,
                centralHeating: true,
                additionalComments: "Reliable but with occasional dips.",
            },
            moldIssues: {
                severity: 2,
                additionalComments: "Some damp patches near windows.",
            },
            noiseInsulation: {
                rating: 3,
                additionalComments: "Traffic noise is audible at night.",
            },
            security: {
                rating: 3,
                frequency: 3,
                bodyguard: false,
                additionalComments: "Feels moderately safe.",
            },
            hvac: {
                summer: 4,
                winter: 4,
                ac: true,
                additionalComments: "AC works fine but could be quieter.",
            },
            buildingFinishes: {
                quality: 3,
                modernity: 3,
                additionalComments: "Standard finishes for the area.",
            },
        },
        createdAt: new Date("2024-03-10T14:00:00Z"),
        updatedAt: new Date("2024-03-10T14:00:00Z"),
    },
];

export const REVIEWS = reviewSeeds.map((reviewData) => {return new Review(reviewData)});
