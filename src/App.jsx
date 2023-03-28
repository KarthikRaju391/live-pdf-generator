import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import PDFPreview from "./PDFPreiview";
import ProjectReportForm from "./ProjectReportForm";
function App() {

	return (
		<div className="App">
			<ProjectReportForm />
			{/* <PDFPreview /> */}
		</div>
	);
}

export default App;
