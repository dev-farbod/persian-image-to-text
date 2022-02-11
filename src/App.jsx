import React, { Fragment, useState } from 'react';
import { FileUploader } from "react-drag-drop-files";
import { createWorker } from 'tesseract.js';

const App = () => {

  const fileTypes = ["JPG", "PNG", "JPEG"];

  const [file, setFile] = useState(null);
  const [p, setP] = useState(0)

  const [pros, setPros] = useState(false)

  const [img, setImg] = useState(null)
  const handleChange = (file) => {
    var reader = new FileReader();
    reader.onload = function () {
      setImg(reader.result)
    }
    reader.readAsDataURL(file);

    setFile(file);

  }


  const sub = () => {

    const worker = createWorker({
      logger: m => {
        if (m.status === "recognizing text") {
          setP(Math.round(m.progress *100))
        }
      }
    });

    (async () => {
      setPros(true)
      await worker.load();
      await worker.loadLanguage('fas');
      await worker.initialize('fas');
      const { data: { text } } = await worker.recognize(img);
      if(text === ""){
        alert("عکس شامل متن نبود یا کیفیت لازم را ندارد")
      }
      document.querySelector("#res").innerHTML=text
      await worker.terminate();
      setPros(false)
      setP(0)
    })();

  }
  return (
    <div className="main container">

      <div className="content">


        <div className="title">
          تبدیل  عکس پی دی اف , کتاب ,دست نوشته و ... به فایل متنی
        </div>

        <div className="input">

          <FileUploader
            handleChange={handleChange} name="file" types={fileTypes}
            label="فایل را اینجا رها کنید یا برای بارگزاری کلیک کنید"
            multiple={false}
          />
        </div>



        {img ? <Fragment><div className="uploaded-img">
          <img src={img} />
        </div>
          <div className="button">
            {!pros ? <button onClick={sub}>شروع برسی</button> :
              <div className="prosses-bar">
               صبر کنید
                <div className="fill" style={{width:`${p}%`}}> {p}%</div>
              </div>
            }
          </div>
          
          <div id="res"></div>
          
           </Fragment> : null}



      </div>
    </div>
  );
}

export default App;