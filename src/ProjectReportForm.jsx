import { Formik, FieldArray, Field } from "formik";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import PDFPreview from "./PDFPreiview";
import { PDFDownloadLink, usePDF } from "@react-pdf/renderer";

const initialValues = {
	projectTitle: "",
	sections: [
		{
			sectionTitle: "",
			contentBlocks: [
				{
					content: "",
					image: null,
				},
			],
		},
	],
};

function ProjectReportForm() {
    // const [instance, updateInstance] = usePDF({ document: <PDFPreview values={values} />})
	const [selectedImage, setSelectedImage] = useState(null);
    const [timer, setTimer] = useState(null);

	const onDrop = (acceptedFiles) => {
		setSelectedImage(acceptedFiles[0]);
	};

	const { getRootProps, getInputProps } = useDropzone({
		accept: "image/*",
		multiple: false,
		onDrop,
	});

	const handleSubmit = (values) => {
		console.log(values);
	};

    // const handleChange = (values) => {
    //     clearTimeout(timer);

    //     const newTimer = setTimeout(() => {
    //         updateInstance(<PDFPreview values={values} />)
    //     }, 1000);

    //     setTimer(newTimer)
    // }

	return (
        <Formik
            initialValues={initialValues}
            onSubmit= {handleSubmit}
        >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                <form onSubmit={handleSubmit}>
                    <label htmlFor="projectTitle">Project Title</label>
                    <input
                        type="text"
                        name="projectTitle"
                        value={values.projectTitle}
                        onBlur={handleBlur}
                    />
                    {errors.projectTitle && touched.projectTitle && (
                        <div>{errors.projectTitle}</div>
                    )}

                    <div className="container">
                        <div>
                            <FieldArray name="sections">
                                {({ push: pushSection, remove }) => (
                                    <>
                                        {values.sections.map((section, sectionIndex) => (
                                            <div key={sectionIndex}>
                                                <h2>Section {sectionIndex + 1}</h2>
                                                <button type="button" onClick={() => remove(sectionIndex)}>
                                                    -
                                                </button>
                                                <label htmlFor={`sections.${sectionIndex}.sectionTitle`}>
                                                    Section Title
                                                </label>
                                                <Field
                                                    type="text"
                                                    name={`sections.${sectionIndex}.sectionTitle`}
                                                />
                                                {errors.sections &&
                                                    errors.sections[sectionIndex] &&
                                                    errors.sections[sectionIndex].sectionTitle && (
                                                        <div>{errors.sections[sectionIndex].sectionTitle}</div>
                                                    )}
                                                {
                                                    <FieldArray name={`sections.${sectionIndex}.contentBlocks`}>
                                                        {({ push: pushContentBlock, remove }) => (
                                                            <>
                                                                {values.sections[sectionIndex].contentBlocks.map(
                                                                    (contentBlock, contentIndex) => (
                                                                        <div key={contentIndex}>
                                                                            <h2>Content Block {contentIndex + 1}</h2>
                                                                            <button
                                                                                type="button"
                                                                                onClick={() => remove(contentIndex)}
                                                                            >
                                                                                -
                                                                            </button>
                                                                            <label
                                                                                htmlFor={`sections.${sectionIndex}.contentBlocks.${contentIndex}.content`}
                                                                            >
                                                                                Content Block Content
                                                                            </label>
                                                                            <Field
                                                                                as="textarea"
                                                                                name={`sections.${sectionIndex}.contentBlocks.${contentIndex}.content`}
                                                                            />
                                                                            {errors.sections &&
                                                                                errors.sections[sectionIndex] &&
                                                                                errors.sections[sectionIndex].contentBlocks &&
                                                                                errors.sections[sectionIndex].contentBlocks[
                                                                                    contentIndex
                                                                                ] &&
                                                                                errors.sections[sectionIndex].contentBlocks[contentIndex]
                                                                                    .content && (
                                                                                    <div>
                                                                                        {
                                                                                            errors.sections[sectionIndex].contentBlocks[
                                                                                                contentIndex
                                                                                            ].content
                                                                                        }
                                                                                    </div>
                                                                                )}
                                                                            <button
                                                                                type="button"
                                                                                onClick={() =>
                                                                                    pushContentBlock({
                                                                                        content: "",
                                                                                        image: null,
                                                                                    })
                                                                                }
                                                                            >
                                                                                +
                                                                            </button>
                                                                        </div>
                                                                    )
                                                                )}
                                                            </>
                                                        )}
                                                    </FieldArray>
                                                }
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            onClick={() =>
                                                pushSection({ sectionTitle: "", contentBlocks: [
                                                    {
                                                        content: "",
                                                        image: null,
                                                    }
                                                ]})
                                            }
                                        >
                                            +
                                        </button>
                                    </>
                                )}
                            </FieldArray>
                        </div>
                        
                        <div className="pdf-view">
                            {/* <PDFPreview values={values}/> */}
                            <PDFDownloadLink document={<PDFPreview values={values} />} fileName="document.pdf">
  {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download PDF')}
</PDFDownloadLink>

                        </div>
                    </div>
                    <button type="submit" disabled={isSubmitting}>
                        Submit
                    </button>
                </form>
            )}
        </Formik>
	);
}

export default ProjectReportForm;
