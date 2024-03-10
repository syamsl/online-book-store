// import React, { useEffect } from "react";
// import Resizer from "react-image-file-resizer";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import { Avatar, Badge } from "antd";





// const FileUpload = ({ values, setValues, setLoading, imageState, setImageState, setErr }) => {
//   const { user } = useSelector((state) => ({ ...state }));



//   const fileUploadAndResize = (e) => {
//     //   console.log(e.target.files);
//     // resize
//     let files = e.target.files;

//     // if(files.length>4){
//     //   setErr('Cannot upload more than 4 images')
//     // }else if (files.length<3){
//     //   setErr('There should be atleast 3 images')
//     // }else{
//     //   setErr('')
//     // }


//     let allUploadedFiles = values.images;

//     if (files) {
//       setLoading(true);
//       for (let i = 0; i < files.length; i++) {



//         Resizer.imageFileResizer(
//           files[i],
//           720,
//           720,
//           "JPEG",
//           100,
//           0,
//           (uri) => {
//             // console.log(uri);
//             axios
//               .post(
//                 `${process.env.REACT_APP_API}/uploadimages`,
//                 { image: uri },
//                 {
//                   headers: {
//                     authtoken: user ? user.token : "",
//                   },
//                 }
//               )
//               .then((res) => {
//                 console.log("IMAGE UPLOAD RES DATA", res);
//                 setLoading(false);
//                 allUploadedFiles.push(res.data);

//                 setValues({ ...values, images: allUploadedFiles });
//                 setImageState(values.images.length)

//               })
//               .catch((err) => {
//                 setLoading(false);
//                 console.log("CLOUDINARY UPLOAD ERR", err);
//               });
//           },
//           "base64"
//         );
//       }
//     } // send back to server to upload cloudinary
//     // set url to images[] in the parent component - ProductCreate
//   };
//   const handleImageRemove = (public_id) => {



//     setLoading(true);
//     // console.log("remove image", id);
//     axios.post(
//       `${process.env.REACT_APP_API}/removeimage`,
//       { public_id },
//       {
//         headers: {
//           authtoken: user ? user.token : "",
//         },
//       }
//     )
//       .then(res => {
//         setLoading(false)
//         const { images } = values
//         let filteredImages = images.filter((item) => {
//           return item.public_id !== public_id;
//         })
//         setValues({ ...values, images: filteredImages });
//         setImageState(values.images.length)
        
//       })
//       .catch(err => {
//         console.log(err)
//         setLoading(false);
//       })


//   };



//   return (
//     <>
//       <div className="row">
//         {values.images &&
//           values.images.map((image) => (
//             <Badge
//               count="X"
//               key={image.public_id}
//               onClick={() => handleImageRemove(image.public_id)}
//               style={{ cursor: "pointer" }}
//             >
//               <Avatar
//                 src={image.url}
//                 size={100}
//                 shape="square"
//                 className="ml-3"
//               />
//             </Badge>
//           ))}
//       </div>
//       <div className="row">
//         <label className="btn btn-info btn-raised mt-3">
//           {" "}
//           Choose File
//           <input
//             type="file"
//             multiple
//             hidden
//             accept="images/*"
//             onChange={fileUploadAndResize}
//           />
//         </label>
//       </div>
//     </>
//   );
// };
// export default FileUpload;



import React, { useEffect, useState } from 'react'
import Resizer from 'react-image-file-resizer'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { Avatar, Badge, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons';
import ImageCropperModal from '../forms/ImageModal'

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const FileUpload = ({ values, setValues, setLoading, loading }) => {


    const [isModalVisible, setIsModalVisible] = useState(false);
    const [srcImg, setSrcImg] = useState(null);
    //save the resulted image
    const [result, setResult] = useState(null);
    const [files, setFiles] = useState(false)

    const { user } = useSelector((state) => ({ ...state }))

    useEffect(() => {

            // console.log('re render');
            fileUploadAndResize()

    }, [files])

    const handleImage = (e) => {
        if (e.target.files.length > 0) {
            setSrcImg(URL.createObjectURL(e.target.files[0]));
            // console.log(e.target.files[0]);

            setIsModalVisible(true)

        }
    };


    const showModal = () => {
        setIsModalVisible(true);
    };


    // const b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
    //     const byteCharacters = atob(b64Data);
    //     const byteArrays = [];

    //     for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    //         const slice = byteCharacters.slice(offset, offset + sliceSize);

    //         const byteNumbers = new Array(slice.length);
    //         for (let i = 0; i < slice.length; i++) {
    //             byteNumbers[i] = slice.charCodeAt(i);
    //         }

    //         const byteArray = new Uint8Array(byteNumbers);
    //         byteArrays.push(byteArray);
    //     }

    //     const blob = new Blob(byteArrays, { type: contentType });
    //     return blob;
    // }

    const onImageEdit = async (imgUrl) => {

        const response = await fetch(imgUrl);
        const blob = await response.blob();

        return blob
    }

    const fileUploadAndResize = async () => {

        // console.log(e.target.files);
        //resize using npm package react image file resize

        // let files = e.target.files
        // console.log(loading)

        // console.log('files ---> ', files, 'isModalVisible ------> ', isModalVisible)

        if(files) {

            let allUploadedFiles = values.images
            const blobFromUrl = await onImageEdit(result)
            setLoading(true)
            // console.log('blobfrom url', blobFromUrl)
    
            Resizer.imageFileResizer(blobFromUrl,
            720,
            720,
            'JPEG',
            100,
            0,
            (uri) => {
                // console.log(uri)
                axios.post(`${process.env.REACT_APP_API}/uploadimages`, { image: uri }, {
                    headers: {
                        authToken: user ? user.token : ''
                    }
                }).then(res => {
                    // console.log('IMG UPLOAD RES DATA', res);
                    setLoading(false)
                    setFiles(false)
                    allUploadedFiles.push(res.data)
                    setValues({ ...values, images: allUploadedFiles })
                })
                    .catch(err => {
                        setLoading(false)
                        // console.log('img upload error');
                    })
            },
            'base64')

        }


        // send back to server to upload to cloudinary
        // set url to images[] in the parent component state - ProductCreate
    }



    // const imageUrlHandle = async (e) => {
    //     e.preventDefault()
    //     let allUploadedFiles = values.images
    //     setLoading(true)



    //     if (e.target[0].value) {
    //         const blobFromUrl = await onImageEdit(e.target[0].value)

    //         console.log(blobFromUrl)


    //         Resizer.imageFileResizer(blobFromUrl,
    //             720,
    //             720,
    //             'JPEG',
    //             100,
    //             0,
    //             (uri) => {
    //                 axios.post(`${process.env.REACT_APP_API}/uploadimages`, { image: uri }, {
    //                     headers: {
    //                         authToken: user ? user.token : ''
    //                     }
    //                 }).then(res => {
    //                     // console.log('IMG UPLOAD RES DATA', res);
    //                     setLoading(false)
    //                     allUploadedFiles.push(res.data)
    //                     setValues({ ...values, images: allUploadedFiles })
    //                     e.target[0].value = ''
    //                 })
    //                     .catch(err => {
    //                         setLoading(false)
    //                         console.log('img upload error');
    //                     })
    //             }, 'base64')
    //     }
    //     else {
    //         setLoading(false)
    //     }

    // }



    const handleImageRemove = (public_id) => {
        setLoading(true)
        // console.log('remove image', public_id)
        axios.post(`${process.env.REACT_APP_API}/removeimage`, { public_id }, {
            headers: {
                authToken: user ? user.token : ''
            }
        }).then(res => {
            // console.log('removed image', res);
            setLoading(false)
            const { images } = values
            let filteredImages = images.filter((image) => image.public_id !== public_id)
            setValues({ ...values, images: filteredImages })
            document.getElementById('productInput').value = null
        })
            .catch(err => {
                // console.log(err);
                setLoading(false)
            })
    }

    return (
        <>
            <div className="row">
                {/* {console.log(values.images)} */}
                {values.images.length > 0 && values.images.map((image) => (
                    <Badge count='X' key={image.public_id} onClick={() => handleImageRemove(image.public_id)} style={{ cursor: 'pointer' }}>
                        <Avatar src={image.url} size={200} shape='square' className='ml-3 mb-2' />
                    </Badge>
                ))}
                {loading && <Spin indicator={antIcon} className='m-3 text-danger' />}
            </div>


            <div className='row'>
                <label className='btn btn-info btn-raised'>Choose File
                    <input type="file"
                        id='productInput'
                        multiple
                        hidden
                        accept='images/*'
                        onChange={handleImage}
                    />

                </label>
                {/* <form onSubmit={imageUrlHandle} className='ml-3' style={{ marginBottom: 0 }}>
                    <input type="text" id='url' />
                    <button type='submit' className='btn' >GET URL</button>
                </form> */}
                <p id='uploadError' className='text-danger'></p>

                <ImageCropperModal
                    isModalVisible={isModalVisible}
                    setIsModalVisible={setIsModalVisible}
                    showModal={showModal}
                    srcImg={srcImg}
                    setResult={setResult}
                    setFiles={setFiles}
                />

            </div>
        </>

    )
}

export default FileUpload