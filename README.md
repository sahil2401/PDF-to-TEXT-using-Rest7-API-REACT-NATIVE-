# PDF-to-TEXT-using-Rest7-API-REACT-NATIVE-
React NAtive:-I have made a Demo App to select  PDF from documents and convert it into text than Display to (<TEXT>)

  
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
  
  
