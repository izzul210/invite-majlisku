/** @format */

import React, { useState } from 'react';
import ReactPlayer from 'react-player/lazy';
import ModalProvider from '../../component/drawer/DrawerProvider';

function MusicPlayButton({ playing }) {
	const [open, setOpen] = useState(false);

	if (!playing) return null;

	return (
		<>
			<div className='floatingMusicButton' onClick={() => setOpen(true)}>
				<svg
					width='19'
					height='18'
					viewBox='0 0 19 18'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'>
					<path
						d='M19 0V12.5C19 13.4283 18.6313 14.3185 17.9749 14.9749C17.3185 15.6313 16.4283 16 15.5 16C14.5717 16 13.6815 15.6313 13.0251 14.9749C12.3687 14.3185 12 13.4283 12 12.5C12 11.5717 12.3687 10.6815 13.0251 10.0251C13.6815 9.36875 14.5717 9 15.5 9C16.04 9 16.55 9.12 17 9.34V3.47L7 5.6V14.5C7 15.4283 6.63125 16.3185 5.97487 16.9749C5.3185 17.6313 4.42826 18 3.5 18C2.57174 18 1.6815 17.6313 1.02513 16.9749C0.368749 16.3185 0 15.4283 0 14.5C0 13.5717 0.368749 12.6815 1.02513 12.0251C1.6815 11.3687 2.57174 11 3.5 11C4.04 11 4.55 11.12 5 11.34V3L19 0Z'
						fill='white'
					/>
				</svg>
			</div>
			<ModalProvider isOpen={open} handleClose={() => setOpen(false)}>
				<div className='w-full flex justify-center'>
					<ReactPlayer
						width={320}
						height={200}
						url='https://www.youtube.com/watch?v=hNLlx9zXF1Y'
						playing={playing}
						controls={true}
					/>
				</div>
			</ModalProvider>
		</>
	);
}

export default MusicPlayButton;
