# Exemplary Dataset 1 Description

## The dataset is obtained from: https://github.com/WaniaKhance/Smart-Glove-Sign-Language-Translator/blob/main/dataset.csv

### Labels explained:
elif a > 0 and a <=1 :
    abc = "victory"
elif a > 1 and a <=2 :
    abc = "Comehere"
elif a > 2 and a <=3 :
    abc = "Okay"
elif a > 3 and a <=4 :
    abc = "Stop"
elif a > 4 and a <=5 :
    abc = "You"
elif a > 5 and a <=6 :
    abc = "Hope"
elif a > 6 and a <=7 :
    abc = "Failure"
elif a > 7 and a <=8 :
    abc = "Really"
elif a > 8 and a <=9 :
    abc = "Quote"
elif a > 9 and a <=10 :
    abc = "No"
elif a > 10 and a <=11 :
    abc = "I Love you"
elif a > 11 and a <=12 :
    abc = "Livelong"
elif a > 12 and a <=13 :
    abc = "Thats it"
elif a > 13 and a <=14 :
    abc = "Solidarity"
elif a > 14 and a <=15 :
    abc = "Rock On"
elif a > 15 and a <=16 :
    abc = "Good Bye"
elif a > 16 and a <=17 :
    abc = "What is wrong"
elif a > 17 and a <=18 :
    abc = "Why"
elif a > 18 and a <= 19 :
    abc = "Rest room"

--> So there are about 19 gestures in their dataset

Note that: Labels 20–25 --> extra gestures they added later (often experiments, extra words, or test gestures)/undocumented
                        --> I'll remove them from there to avoid any confusion


# Exemplary Dataset 2 Description

The original Kaggle dataset contained multiple frame-based sensor readings and included both left and right hand data. 
Since our actual hardware will use only one hand (right hand) and will not store frame-by-frame sequences, 
the dataset was simplified to match our real system design. 
The 20 frame values per sensor were aggregated into single representative values (using averaging) to simulate real-time single-sample readings. 
Only the required sensors were kept: five flex sensors and accelerometer axes (X, Y, Z), along with the gesture label.

After restructuring, the dataset was cleaned by removing duplicates, handling missing values, and filtering outliers to improve data quality. 
Feature scaling was applied to normalize sensor ranges, ensuring that all inputs contribute equally during model training. 
Finally, the data was split into training and testing sets to prepare for machine learning model evaluation.

These steps were performed to make the dataset compatible with our planned hardware setup and to ensure 
a stable and reusable preprocessing pipeline for future real sensor data.

