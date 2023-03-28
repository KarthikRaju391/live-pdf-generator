import React from "react";
import {
	Document,
	Page,
	Text,
	View,
	StyleSheet,
	PDFViewer,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
	page: {
		backgroundColor: "#d11fb6",
		color: "#fff",
	},
	section: {
		margin: 10,
		padding: 10,
	},
	viewer: {
		width: window.innerWidth/2,
		height: window.innerHeight,
	},
});

function PDFPreview({ values }) {
	return (
		<PDFViewer style={styles.viewer}>
			<Document>
				{values.sections.map((section, index) => (
					<Page key={index}>
						<View>
							<Text>{section.sectionTitle}</Text>
							{section.contentBlocks.map((block, index) => (
								<View key={index}>
									<Text>{block.content}</Text>
								</View>
							))}
						</View>
					</Page>
				))}
			</Document>
		</PDFViewer>
	);
}

export default PDFPreview;
