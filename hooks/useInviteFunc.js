/** @format */

export const useInviteFunc = () => {
	const useConvertText = (text) => {
		if (!text) return null;
		return <div style={{ whiteSpace: 'pre-line' }}>{text}</div>;
	};

	return { useConvertText };
};
