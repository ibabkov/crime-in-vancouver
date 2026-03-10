import '../styles/globals.css';
import '../styles/theme.css';

import { Metadata, Viewport } from 'next';

import { APP_DESCRIPTION, DISPLAY_APP_TITLE } from '../constants/app';
import { Layout } from '../components/Layout';

export const metadata: Metadata = {
	title: DISPLAY_APP_TITLE,
	description: APP_DESCRIPTION,
};

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	minimumScale: 1,
	viewportFit: 'cover',
	userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body>
				<Layout>{children}</Layout>
			</body>
		</html>
	);
}
