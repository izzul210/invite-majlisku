/** @format */
import '../styles/globals.css';
import '../styles/rsvp.scss';
import '../styles/accordian.scss';
import '../styles/InviteTemplate.scss';
import '../template/tentative/Tentative.scss';
//New import
import '../component/textProvider/InviteTextProvider.scss';
import '../template/firstScreen/FirstScreen.scss';

export const metadata = {
	title: {
		template: '%s',
	},
	description: {
		template: '%s',
	},
};

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body>{children}</body>
		</html>
	);
}
