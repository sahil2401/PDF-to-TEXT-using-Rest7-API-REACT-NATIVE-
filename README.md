# PDF-to-TEXT-using-Rest7-API-REACT-NATIVE-
I have made a Demo App to select PDF from documents and convert it into text than Display in (<TEXT> component) using API in REACT NATIVE

  get API_URL LINK from here : http://www.rest7.com/pdf_to_text 
  
 - Importent Packeges to Install :- 
  
   1) npm install react-native-document-picker --save
   2) npm i react-native-fs  
          - if this gives any error use this = npm i react-native-fs --force

 - few changes into (android/app/src/main/AndroidManifest.xml) file:-
        Add Permissions  :  <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
                           <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
  
 - Import this two packege into your app.js file:-
  
    import DocumentPicker from 'react-native-document-picker';
    import RNFS from 'react-native-fs
  
  (Select the PDF file, Press Upload, and Press Convert to Display Text)
  
![ss](https://user-images.githubusercontent.com/88420801/150281109-e43167de-d546-4643-a935-82c5af3003e7.jpeg)
