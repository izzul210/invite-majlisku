/** @format */

export const useConvert = () => {
	const useConvertText = (text) => {
		if (!text) return null;

		return text?.split('\n').map((line) => (
			<>
				{line}
				<br />
			</>
		));
	};

	return { useConvertText };
};

export const initOldUsersHosts = (hosts) => {
	let formattedHosts = hosts.map((host) => host.replace(/ & /g, '\n&\n') + '\n\n');
	let str = formattedHosts.join('').trim();
	return str;
};
