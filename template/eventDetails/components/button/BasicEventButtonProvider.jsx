/** @format */

export default function BasicEventButtonProvider({ type = null, className = '', children }) {
	return (
		<div
			className={`${className} w-full font-medium rounded-full py-3 px-8 flex flex-row justify-center items-center gap-2 cursor-pointer`}
			style={
				type === 'primary'
					? { color: 'white', backgroundColor: '#1E1E1E', border: ' 1px solid #1E1E1E' }
					: { color: '#1E1E1E', backgroundColor: 'white', border: ' 1px solid #1E1E1E' }
			}>
			{children}
		</div>
	);
}
