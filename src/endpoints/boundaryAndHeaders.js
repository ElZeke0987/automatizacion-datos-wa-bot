
let boundary;

function generateBoundary () {
    // This generates a 50 character boundary similar to those used by Firefox.
    // They are optimized for boyer-moore parsing.
    var newBoundary = '--------------------------';
    for (var i = 0; i < 24; i++) {
      newBoundary += Math.floor(Math.random() * 10).toString(16);
    }
  
    boundary = newBoundary;
};

function getBoundary() {
    if (!boundary) {
      generateBoundary();
    }
  
    return boundary;
  };
export function getHeaders (userHeaders, onlyContenType=true) {
  
    var formHeaders = {
      'Content-Type': 'multipart/form-data; boundary=' +getBoundary()
    };
    if(onlyContenType)return formHeaders;
    userHeaders?.forEach((header, i)=>{
      formHeaders[header[0].toLowerCase()] = userHeaders[i][1];
      
    })

  
    return formHeaders;
  };
