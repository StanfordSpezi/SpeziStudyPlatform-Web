//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

export const healthDataTypes = {
  Correlation: [
    {
      label: "Blood Pressure",
      value: "HKCorrelationType;HKCorrelationTypeIdentifierBloodPressure",
    },
  ],
  Category: [
    {
      label: "Mindful Session",
      value: "HKCategoryType;HKCategoryTypeIdentifierMindfulSession",
    },
    {
      label: "Sleep Analysis",
      value: "HKCategoryType;HKCategoryTypeIdentifierSleepAnalysis",
    },
    {
      label: "Apple Stand Hour",
      value: "HKCategoryType;HKCategoryTypeIdentifierAppleStandHour",
    },
    {
      label: "High Heart Rate Event",
      value: "HKCategoryType;HKCategoryTypeIdentifierHighHeartRateEvent",
    },
    {
      label: "Low Heart Rate Event",
      value: "HKCategoryType;HKCategoryTypeIdentifierLowHeartRateEvent",
    },
    {
      label: "Apple Walking Steadiness Event",
      value:
        "HKCategoryType;HKCategoryTypeIdentifierAppleWalkingSteadinessEvent",
    },
    {
      label: "Irregular Heart Rhythm Event",
      value: "HKCategoryType;HKCategoryTypeIdentifierIrregularHeartRhythmEvent",
    },
  ],
  Quantity: [
    {
      label: "Apple Walking Steadiness",
      value: "HKQuantityType;HKQuantityTypeIdentifierAppleWalkingSteadiness",
    },
    {
      label: "Heart Rate Variability SDNN",
      value: "HKQuantityType;HKQuantityTypeIdentifierHeartRateVariabilitySDNN",
    },
    {
      label: "Dietary Cholesterol",
      value: "HKQuantityType;HKQuantityTypeIdentifierDietaryCholesterol",
    },
    {
      label: "Walking Speed",
      value: "HKQuantityType;HKQuantityTypeIdentifierWalkingSpeed",
    },
    {
      label: "Body Mass Index",
      value: "HKQuantityType;HKQuantityTypeIdentifierBodyMassIndex",
    },
    {
      label: "Blood Alcohol Content",
      value: "HKQuantityType;HKQuantityTypeIdentifierBloodAlcoholContent",
    },
    {
      label: "Distance Wheelchair",
      value: "HKQuantityType;HKQuantityTypeIdentifierDistanceWheelchair",
    },
    {
      label: "Resting Heart Rate",
      value: "HKQuantityType;HKQuantityTypeIdentifierRestingHeartRate",
    },
    {
      label: "VO2 Max",
      value: "HKQuantityType;HKQuantityTypeIdentifierVO2Max",
    },
    {
      label: "Active Energy Burned",
      value: "HKQuantityType;HKQuantityTypeIdentifierActiveEnergyBurned",
    },
    {
      label: "Inhaler Usage",
      value: "HKQuantityType;HKQuantityTypeIdentifierInhalerUsage",
    },
    {
      label: "Body Mass",
      value: "HKQuantityType;HKQuantityTypeIdentifierBodyMass",
    },
    {
      label: "Stair Ascent Speed",
      value: "HKQuantityType;HKQuantityTypeIdentifierStairAscentSpeed",
    },
    {
      label: "Distance Walking Running",
      value: "HKQuantityType;HKQuantityTypeIdentifierDistanceWalkingRunning",
    },
    {
      label: "Stair Descent Speed",
      value: "HKQuantityType;HKQuantityTypeIdentifierStairDescentSpeed",
    },
    {
      label: "Six Minute Walk Test Distance",
      value: "HKQuantityType;HKQuantityTypeIdentifierSixMinuteWalkTestDistance",
    },
    {
      label: "Blood Glucose",
      value: "HKQuantityType;HKQuantityTypeIdentifierBloodGlucose",
    },
    {
      label: "Respiratory Rate",
      value: "HKQuantityType;HKQuantityTypeIdentifierRespiratoryRate",
    },
    {
      label: "Waist Circumference",
      value: "HKQuantityType;HKQuantityTypeIdentifierWaistCircumference",
    },
    {
      label: "Apple Stand Time",
      value: "HKQuantityType;HKQuantityTypeIdentifierAppleStandTime",
    },
    {
      label: "Basal Body Temperature",
      value: "HKQuantityType;HKQuantityTypeIdentifierBasalBodyTemperature",
    },
    {
      label: "Walking Asymmetry Percentage",
      value:
        "HKQuantityType;HKQuantityTypeIdentifierWalkingAsymmetryPercentage",
    },
    {
      label: "Flights Climbed",
      value: "HKQuantityType;HKQuantityTypeIdentifierFlightsClimbed",
    },
    {
      label: "Basal Energy Burned",
      value: "HKQuantityType;HKQuantityTypeIdentifierBasalEnergyBurned",
    },
    {
      label: "Body Temperature",
      value: "HKQuantityType;HKQuantityTypeIdentifierBodyTemperature",
    },
    {
      label: "Heart Rate",
      value: "HKQuantityType;HKQuantityTypeIdentifierHeartRate",
    },
    {
      label: "Distance Swimming",
      value: "HKQuantityType;HKQuantityTypeIdentifierDistanceSwimming",
    },
    {
      label: "Body Fat Percentage",
      value: "HKQuantityType;HKQuantityTypeIdentifierBodyFatPercentage",
    },
    {
      label: "Heart Rate Recovery One Minute",
      value:
        "HKQuantityType;HKQuantityTypeIdentifierHeartRateRecoveryOneMinute",
    },
    {
      label: "Atrial Fibrillation Burden",
      value: "HKQuantityType;HKQuantityTypeIdentifierAtrialFibrillationBurden",
    },
    {
      label: "Height",
      value: "HKQuantityType;HKQuantityTypeIdentifierHeight",
    },
    {
      label: "Apple Exercise Time",
      value: "HKQuantityType;HKQuantityTypeIdentifierAppleExerciseTime",
    },
    {
      label: "Lean Body Mass",
      value: "HKQuantityType;HKQuantityTypeIdentifierLeanBodyMass",
    },
    {
      label: "Step Count",
      value: "HKQuantityType;HKQuantityTypeIdentifierStepCount",
    },
    {
      label: "Walking Step Length",
      value: "HKQuantityType;HKQuantityTypeIdentifierWalkingStepLength",
    },
    {
      label: "Oxygen Saturation",
      value: "HKQuantityType;HKQuantityTypeIdentifierOxygenSaturation",
    },
    {
      label: "Walking Double Support Percentage",
      value:
        "HKQuantityType;HKQuantityTypeIdentifierWalkingDoubleSupportPercentage",
    },
    {
      label: "Distance Cycling",
      value: "HKQuantityType;HKQuantityTypeIdentifierDistanceCycling",
    },
    {
      label: "Dietary Vitamin D",
      value: "HKQuantityType;HKQuantityTypeIdentifierDietaryVitaminD",
    },
    {
      label: "Apple Move Time",
      value: "HKQuantityType;HKQuantityTypeIdentifierAppleMoveTime",
    },
    {
      label: "Walking Heart Rate Average",
      value: "HKQuantityType;HKQuantityTypeIdentifierWalkingHeartRateAverage",
    },
  ],
  Other: [
    {
      label: "Electrocardiogram",
      value: "HKElectrocardiogramType;HKDataTypeIdentifierElectrocardiogram",
    },
    {
      label: "Workout",
      value: "HKWorkoutType;HKWorkoutTypeIdentifier",
    },
  ],
};
