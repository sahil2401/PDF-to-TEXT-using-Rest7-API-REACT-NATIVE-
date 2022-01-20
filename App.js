
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Pressable,
  ScrollView,
  Alert,
} from 'react-native';

// Import Document Picker
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';

const API_URL = "http://api.rest7.com/v1/pdf_to_text.php?layout=0";
const App = () => {
  const [url, setUrl] = useState('');
  const [resultText, setResultText] = useState('');
  const [singleFile, setSingleFile] = useState(null);

  const Upload = async () => {
    // Check if any file is selected or not
    if (singleFile != null) {
      // If file selected then create FormData
      const fileToUpload = singleFile;
      const data = new FormData();
      console.log(fileToUpload.uri);
      data.append('file', fileToUpload);
      data.append('Content-Type', 'application/pdf');
      // Please change file upload URL
      try {
        let res = await fetch(
          'http://api.rest7.com/v1/pdf_to_text.php?layout=0',
          {
            method: 'POST',
            body: data,
            headers: {
              'Content-Type': 'multipart/form-data; ',
            },
          },
        );

        let responseJson = await res.json();
        if (responseJson.success == 1) {
          console.log(responseJson);
          Alert.alert('success !!');
          // console.log(responseJson.file);
          setUrl(responseJson.file);
        } else {
          console.log(responseJson);
          Alert.alert('FAiled !!');
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      // If no file selected the show alert
      alert('Please Select File first');
    }
  };

  const convert = async () => {
    // Check if any file is selected or not // Please change file upload URL
    try {
      const f2 = url.split('/');
      const fileName = f2[f2.length - 31];
      console.log('File name: ' + fileName);
      const localFile = `${RNFS.DocumentDirectoryPath}/${fileName}`;
      console.log('LocalFile: ' + localFile);
      const options = {
        fromUrl: url,
        toFile: localFile,
      };

      RNFS.downloadFile(options).promise.then(async () => {
        const gettxt = await RNFS.readFile(localFile);
        setResultText(gettxt);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const selectFile = async () => {
    // Opening Document Picker to select one file
    try {
      const res = await DocumentPicker.pick({
        // Provide which type of file you want user to pick
        type: [DocumentPicker.types.allFiles],
        // There can me more options as well
        // DocumentPicker.types.allFiles
        // DocumentPicker.types.images
        // DocumentPicker.types.plainText
        // DocumentPicker.types.audio
        // DocumentPicker.types.pdf
      });
      // Printing the log realted to the file
      console.log('res : ' + JSON.stringify(res));
      // Setting the state to show single file attributes
      setSingleFile(res[0]);
    } catch (err) {
      setSingleFile(null);
      // Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        // If user canceled the document selection
        alert('Canceled');
      } else {
        // For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };



  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Text style={styles.titleText}>
          PDF to TEXT
        </Text>
        <View style={styles.container}>
          {/*To show single file attribute*/}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.buttonStyle}
              onPress={selectFile}>
              {/*Single file selection button*/}
              <Image
                source={{
                  uri: 'https://img.icons8.com/offices/40/000000/attach.png',
                }}
                style={styles.imageIconStyle}
              />
              <Text style={{ marginRight: 10, fontSize: 19, paddingLeft: 20 }}>
                Select file
              </Text>

            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.buttonStyle}
              onPress={Upload}>
              {/*Single file selection button*/}
              <Text style={{ marginRight: 10, fontSize: 19, paddingLeft: 20 }}>
                Upload
              </Text>

            </TouchableOpacity>
          </View>
          {singleFile != null ? (
            <Text style={{ fontSize: 15, margin: 5 }}>
              File Name: {singleFile.name ? singleFile.name : ''}
              {'\n'}
              File Size: {singleFile.size ? singleFile.size : ''}
            </Text>
          ) : null}
        </View>
        <View style={{ flex: 4 }}>
          <Pressable style={({ pressed }) => ({ backgroundColor: pressed ? '#ffffff90' : '#3385ff', borderRadius: 10, borderWidth: 1, padding: 10, borderColor: 'white', marginTop: 20, marginLeft: 120, width: 140, alignItems: 'center', justifyContent: 'center' })}
            onPress={convert}>
            <Text style={{ fontSize: 20, color: '#fff', fontWeight: 'bold' }}>
              Convert
            </Text>
          </Pressable>

          <View style={styles.result}>
            <ScrollView>
              {resultText != null ? (
                <Text>
                  {resultText}
                </Text>
              ) : null}

            </ScrollView>
          </View>
        </View>
      </View>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
  },
  textStyle: {
    backgroundColor: '#fff',
    fontSize: 15,
    marginTop: 16,
    color: 'black',
  },
  buttonStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#DDDDDD',
    padding: 5,
  },
  imageIconStyle: {
    height: 20,
    width: 20,
    resizeMode: 'stretch',
  },
  result: {
    margin: 5,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'flex-end',
    width: 380,
    height: 500,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#000'
  },
});
export default App;