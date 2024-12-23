import React, { useState } from "react";
import "./AddBlog.css";
import upload_area from "../../assets/upload_area.svg";
import { message } from "antd";
import { getDownloadURL, ref, uploadBytes } from "../../Firebase/Firebase";
import { addDoc, collection } from "../../Firebase/Firebase";
import { db, storage } from "../../Firebase/Firebase";

const AddBlog = () => {
  const [image, setImage] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [blogDetails, setBlogDetails] = useState({
    title: "",
    category: "",
    simpledescription:"",
    back:"",
    description: {
      story: "",
      plusPoint: "",
      minusPoint: "",
      technicalAspect: "",
      finalReview: "",
    },
    star: "",
    details: {
      genre: "",
      createdBy: "",
      directedBy: "",
      starring: [],
      musicBy: "",
      countryOfOrigin: "",
      originalLanguage: "",
      seasons: 0,
      numberOfEpisodes: 0,
    },
  });

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleThumbnail = (e) => {
    setThumbnail(e.target.files[0]);
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setBlogDetails({
      ...blogDetails,
      [name]: value,
    });
  };

  const handleDescriptionChange = (e) => {
    const { name, value } = e.target;
    setBlogDetails({
      ...blogDetails,
      description: {
        ...blogDetails.description,
        [name]: value,
      },
    });
  };

  const handleDetailsChange = (e) => {
    const { name, value } = e.target;
    setBlogDetails({
      ...blogDetails,
      details: {
        ...blogDetails.details,
        [name]: value,
      },
    });
  };

  const handleStarringChange = (e) => {
    const { value } = e.target;
    setBlogDetails({
      ...blogDetails,
      details: {
        ...blogDetails.details,
        starring: value.split(",").map((item) => item.trim()),
      },
    });
  };

  const isFormValid = () => {
    const { details } = blogDetails;
    return (
      details.genre &&
      details.createdBy &&
      details.directedBy &&
      details.musicBy &&
      details.countryOfOrigin &&
      details.originalLanguage
    );
  };

  const AddNewBlog = async () => {
    if (!isFormValid()) {
      message.error("Please fill all required fields in details.");
      return;
    }
  
    try {
      let imgURL = null;
      let thumbnailURL = null;
      if(image){
        const imgRef = ref(storage, `blogs/images/${image.name}`);
        const imgSnapshot = await uploadBytes(imgRef, image);
        imgURL = await getDownloadURL(imgSnapshot.ref);

      }
      if(thumbnail){
      // 1. Upload images to Firebase Storage and get their URLs
      
      const thumbnailRef = ref(storage, `blogs/thumbnails/${thumbnail.name}`);
  
      // Upload images to Firebase Storage
      
      const thumbnailSnapshot = await uploadBytes(thumbnailRef, thumbnail);
  
      // Get download URLs for uploaded images
      
      thumbnailURL = await getDownloadURL(thumbnailSnapshot.ref);
    }
  
      // 2. Prepare blog data for Firestore
      const blogData = {
        img: imgURL || "", // Main card image URL
        thumbnail: thumbnailURL || "", // Thumbnail image URL
        title: blogDetails.title,
        simpledescription: blogDetails.simpledescription,
        back: blogDetails.back,
        category: blogDetails.category,
        star: blogDetails.star,
        description: blogDetails.description, // Object
        details: blogDetails.details, // Object
        createdAt: new Date(), // Timestamp for sorting
      };
  
      // 3. Add blog data to Firestore
      const docRef = await addDoc(collection(db, "blogs"), blogData);
      setTimeout(() => {
        message.success("Blog added successfully!");
      }, 100); // Delay to ensure the message is displayed
      // console.log("Blog document written with ID:", docRef.id);
  
      // 4. Reset form after successful submission
      setImage(null);
      setThumbnail(null);
      setBlogDetails({
        title: "",
        category: "",
        simpledescription: "",
        back: "",
        description: {
          descriptiontitle: "",
          story: "",
          plusPoint: "",
          minusPoint: "",
          technicalAspect: "",
          finalReview: "",
        },
        star: "",
        details: {
          genre: "",
          createdBy: "",
          directedBy: "",
          starring: [],
          musicBy: "",
          countryOfOrigin: "",
          originalLanguage: "",
          seasons: 0,
          numberOfEpisodes: 0,
        },
      });
    } catch (error) {
      console.error("Error adding blog:", error);
      message.error("Error adding blog. Please try again.");
    }
  };



  
  return (
    <div className="add-blog">
      <h2>Add New Blog</h2>
      {/* Blog Title */}
      <div className="add-blog-itemfield">
        <p>Blog Title</p>
        <input
          value={blogDetails.title}
          onChange={changeHandler}
          type="text"
          name="title"
          placeholder="Enter blog title"
        />
      </div>

      {/* Blog Category */}
      <div className="add-blog-itemfield">
        <p>Blog Category</p>
        <select
          value={blogDetails.category}
          onChange={changeHandler}
          name="category"
          className="add-blog-selector"
        >
          <option value="Hollywood">Hollywood</option>
          <option value="Tollywood">Tollywood</option>
          <option value="Bollywood">Bollywood</option>
          <option value="Kollywood">Kollywood</option>
          <option value="Trending">Trending</option>
          <option value="tamilDub">TamilDub</option>
        </select>
      </div>

      {/* Star Rating */}
      <div className="add-blog-itemfield">
        <p>Star Rating</p>
        <input
          value={blogDetails.star}
          onChange={changeHandler}
          type="number"
          name="star"
          placeholder="Enter star rating"
          min="1"
          max="5"
          step="0.1" // Allows decimal inputs like 4.5
        />
      </div>


      <div className="add-blog-itemfield">
        <p>Simple Description</p>
        <input
          value={blogDetails.simpledescription}
          onChange={changeHandler}
          type="text"
          name="simpledescription"
          placeholder="Enter simple description.."
        />
      </div>

      <div className="add-blog-itemfield">
        <p>Enter the youtube link</p>
        <input
          value={blogDetails.back}
          onChange={changeHandler}
          type="text"
          name="back"
          placeholder="enter the youtube link..."
        />
      </div>

      {/* Description Fields */}
      <div className="add-blog-description">
        <h3>Description</h3>
        {[
          "descriptiontitle",
          "story",
          "plusPoint",
          "minusPoint",
          "technicalAspect",
          "finalReview",
        ].map((field) => (
          <div className="add-blog-itemfield" key={field}>
            <p>{field.charAt(0).toUpperCase() + field.slice(1)}</p>
            <textarea
              value={blogDetails.description[field]}
              onChange={handleDescriptionChange}
              name={field}
              placeholder={`Write the ${field}`}
            />
          </div>
        ))}
      </div>

      {/* Details Fields */}
      <div className="add-blog-details">
        <h3>Details</h3>
        {[
          "genre",
          "createdBy",
          "directedBy",
          "musicBy",
          "countryOfOrigin",
          "originalLanguage",
        ].map((field) => (
          <div className="add-blog-itemfield" key={field}>
            <p>{field.charAt(0).toUpperCase() + field.slice(1)}</p>
            <input
              value={blogDetails.details[field]}
              onChange={handleDetailsChange}
              type="text"
              name={field}
              placeholder={`Enter ${field}`}
            />
          </div>
        ))}
        <div className="add-blog-itemfield">
          <p>Starring</p>
          <input
            value={blogDetails.details.starring.join(", ")} // Show comma-separated values
            onChange={handleStarringChange}
            type="text"
            name="starring"
            placeholder="Enter starring (comma separated)"
          />
        </div>
        <div className="add-blog-itemfield">
          <p>Seasons</p>
          <input
            value={blogDetails.details.seasons}
            onChange={handleDetailsChange}
            type="number"
            name="seasons"
            placeholder="Enter number of seasons"
            min="0"
          />
        </div>
        <div className="add-blog-itemfield">
          <p>Number of Episodes</p>
          <input
            value={blogDetails.details.numberOfEpisodes}
            onChange={handleDetailsChange}
            type="number"
            name="numberOfEpisodes"
            placeholder="Enter number of episodes"
            min="0"
          />
        </div>
      </div>

      {/* Image Upload */}
      <div className="add-blog-itemfield">
        <p>Card Image</p>
        <label htmlFor="file-input">
          <img
            src={image ? URL.createObjectURL(image) : upload_area}
            alt="upload-img"
            className="addblog-thumbnail-img"
          />
        </label>
        <input
          onChange={handleImage}
          type="file"
          name="image"
          id="file-input"
          hidden
        />
      </div>

      {/* Thumbnail Upload */}
      <div className="add-blog-itemfield">
        <p>Thumbnail..</p>
        <input
          onChange={handleThumbnail}
          type="file"
          name="thumbnail"
          id="thumnail-input"
        />
      </div>

      {/* Submit Button */}
      <button onClick={AddNewBlog} className="add-blog-btn">
        ADD BLOG
      </button>
    </div>
  );
};

export default AddBlog;


// const AddNewBlog = async () => {
  //   if (!isFormValid()) {
  //     message.error("Please fill all required fields in details.");
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append("img", image);
  //   formData.append("thumbnail", thumbnail);

  //   // Append blog details to formData
  //   formData.append("title", blogDetails.title);
  //   formData.append("simpledescription", blogDetails.simpledescription);
  //   formData.append("back", blogDetails.back);
  //   formData.append("category", blogDetails.category);
  //   formData.append("star", blogDetails.star);

  //   // Append description fields separately
  //   for (const key in blogDetails.description) {
  //     formData.append(`description[${key}]`, blogDetails.description[key]);
  //   }

  //   // Append details fields separately
  //   for (const key in blogDetails.details) {
  //     if (Array.isArray(blogDetails.details[key])) {
  //       formData.append(`details[${key}]`, blogDetails.details[key].join(",")); // Join array as a comma-separated string
  //     } else {
  //       formData.append(`details[${key}]`, blogDetails.details[key]);
  //     }
  //   }

  //   try {
  //     const response = await fetch("https://moviebackend-o6m5.onrender.com/api/blogs", {
  //       method: "POST",
  //       body: formData,
  //     });

  //     if (response.ok) {
  //       message.success("Blog Added Successfully");
  //       // Reset the form after successful submission
  //       setImage(null);
  //       setThumbnail(null);
  //       setBlogDetails({
  //         title: "",
  //         category: "",
  //         simpledescription:"",
  //         back:"",
  //         description: {
  //           descriptiontitle : "",
  //           story: "",
  //           plusPoint: "",
  //           minusPoint: "",
  //           technicalAspect: "",
  //           finalReview: "",
  //         },
  //         star: "",
  //         details: {
  //           genre: "",
  //           createdBy: "",
  //           directedBy: "",
  //           starring: [],
  //           musicBy: "",
  //           countryOfOrigin: "",
  //           originalLanguage: "",
  //           seasons: 0,
  //           numberOfEpisodes: 0,
  //         },
  //       });
  //     } else {
  //       const errorData = await response.json();
  //       message.error(`Error: ${errorData.message}`);
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //     message.error("Error adding blog");
  //   }
  // };




// old code 

// import React, { useState } from "react";
// import { message } from "antd";
// import { getDownloadURL, ref, uploadBytes } from "../../Firebase/Firebase";
// import { addDoc, collection } from "../../Firebase/Firebase";
// import { db, storage } from "../../Firebase/Firebase";

// const AddBlog = () => {
//   const [blogDetails, setBlogDetails] = useState({
//     title: "",
//     category: "",
//     simpledescription: "",
//     back: "",
//     description: {
//       story: "",
//       plusPoint: "",
//       minusPoint: "",
//       technicalAspect: "",
//       finalReview: "",
//     },
//     star: "",
//     details: {
//       genre: "",
//       createdBy: "",
//       directedBy: "",
//       starring: [],
//       musicBy: "",
//       countryOfOrigin: "",
//       originalLanguage: "",
//       seasons: 0,
//       numberOfEpisodes: 0,
//     },
//     image1: null,
//     image2: null,
//   });
//   const [isLoading, setIsLoading] = useState(false);

//   const changeHandler = (e) => {
//     const { name, value } = e.target;
//     setBlogDetails((prevState) => ({ ...prevState, [name]: value }));
//   };

//   const fileChangeHandler = (e) => {
//     const { name, files } = e.target;
//     setBlogDetails((prevState) => ({ ...prevState, [name]: files[0] }));
//   };

//   const handleDescriptionChange = (e) => {
//     const { name, value } = e.target;
//     setBlogDetails((prevState) => ({
//       ...prevState,
//       description: {
//         ...prevState.description,
//         [name]: value,
//       },
//     }));
//   };

//   const handleDetailsChange = (e) => {
//     const { name, value } = e.target;
//     setBlogDetails((prevState) => ({
//       ...prevState,
//       details: {
//         ...prevState.details,
//         [name]: value,
//       },
//     }));
//   };

//   const handleStarringChange = (e) => {
//     const { value } = e.target;
//     setBlogDetails((prevState) => ({
//       ...prevState,
//       details: {
//         ...prevState.details,
//         starring: value.split(",").map((item) => item.trim()),
//       },
//     }));
//   };

//   const validateFields = () => {
//     const { title, category, details } = blogDetails;
//     if (!title || !category || !details.genre || !details.createdBy || !details.directedBy || !details.musicBy || !details.countryOfOrigin || !details.originalLanguage) {
//       message.error("Please fill out all required fields.");
//       return false;
//     }
//     return true;
//   };

//   const uploadImage = async (image, folder) => {
//     if (!image) return null;
//     const imageRef = ref(storage, `${folder}/${Date.now()}-${image.name}`);
//     await uploadBytes(imageRef, image);
//     return getDownloadURL(imageRef);
//   };

//   const AddNewBlog = async () => {
//     if (!validateFields()) return;
//     setIsLoading(true);

//     try {
//       const imageUrls = await Promise.all([
//         uploadImage(blogDetails.image1, "images"),
//         uploadImage(blogDetails.image2, "images"),
//       ]);

//       const blogData = {
//         title: blogDetails.title,
//         category: blogDetails.category,
//         simpledescription: blogDetails.simpledescription,
//         back: blogDetails.back,
//         description: blogDetails.description,
//         star: blogDetails.star,
//         details: blogDetails.details,
//         images: imageUrls.filter((url) => url !== null),
//         createdAt: new Date(),
//       };

//       await addDoc(collection(db, "Blogs"), blogData);
//       message.success("Blog added successfully!");

//       setBlogDetails({
//         title: "",
//         category: "",
//         simpledescription: "",
//         back: "",
//         description: {
//           story: "",
//           plusPoint: "",
//           minusPoint: "",
//           technicalAspect: "",
//           finalReview: "",
//         },
//         star: "",
//         details: {
//           genre: "",
//           createdBy: "",
//           directedBy: "",
//           starring: [],
//           musicBy: "",
//           countryOfOrigin: "",
//           originalLanguage: "",
//           seasons: 0,
//           numberOfEpisodes: 0,
//         },
//         image1: null,
//         image2: null,
//       });
//     } catch (error) {
//       console.error(error);
//       message.error("Failed to add the blog. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="add-blog">
//       <h1>Add New Blog</h1>
//       <input
//         type="text"
//         name="title"
//         value={blogDetails.title}
//         onChange={changeHandler}
//         placeholder="Enter blog title"
//       />
//       <input
//         type="text"
//         name="category"
//         value={blogDetails.category}
//         onChange={changeHandler}
//         placeholder="Enter blog category"
//       />
//       <input
//         type="text"
//         name="simpledescription"
//         value={blogDetails.simpledescription}
//         onChange={changeHandler}
//         placeholder="Enter simple description"
//       />
//       <input
//         type="text"
//         name="back"
//         value={blogDetails.back}
//         onChange={changeHandler}
//         placeholder="Enter YouTube link"
//       />

//       <h3>Description</h3>
//       {Object.keys(blogDetails.description).map((key) => (
//         <textarea
//           key={key}
//           name={key}
//           value={blogDetails.description[key]}
//           onChange={handleDescriptionChange}
//           placeholder={`Enter ${key}`}
//         />
//       ))}

//       <h3>Details</h3>
//       {Object.keys(blogDetails.details).map((key) => (
//         key !== "starring" ? (
//           <input
//             key={key}
//             type={typeof blogDetails.details[key] === "number" ? "number" : "text"}
//             name={key}
//             value={blogDetails.details[key]}
//             onChange={handleDetailsChange}
//             placeholder={`Enter ${key}`}
//           />
//         ) : (
//           <textarea
//             key={key}
//             name={key}
//             value={blogDetails.details.starring.join(", ")}
//             onChange={handleStarringChange}
//             placeholder="Enter starring (comma separated)"
//           />
//         )
//       ))}

//       <input
//         type="file"
//         name="image1"
//         onChange={fileChangeHandler}
//         accept="image/*"
//       />
//       <input
//         type="file"
//         name="image2"
//         onChange={fileChangeHandler}
//         accept="image/*"
//       />

//       <button onClick={AddNewBlog} disabled={isLoading}>
//         {isLoading ? "Uploading..." : "ADD BLOG"}
//       </button>
//     </div>
//   );
// };

// export default AddBlog;


