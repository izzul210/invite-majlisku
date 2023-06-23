/** @format */
import React from 'react';
//Styling import
///////////MUI
import { styled } from '@mui/material/styles';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { DropDownIcon } from '../../../icons';
const Accordion = styled((props) => (
	<MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
	borderBottom: `1px solid rgba(228, 231, 236, 1)`,
	'&:not(:last-child)': {
		borderBottom: '1px solid rgba(0,0,0,0.3)',
	},
	'&:before': {
		display: 'none',
	},
}));

const AccordionWithoutBorder = styled((props) => (
	<MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
	'&:not(:last-child)': {
		borderBottom: '1px solid rgba(0,0,0,0.3)',
	},
	'&:before': {
		display: 'none',
	},
}));

const AccordionSummary = styled((props) => (
	<MuiAccordionSummary expandIcon={<DropDownIcon />} {...props} />
))(({ theme }) => ({
	padding: '8px 0px',
	flexDirection: 'row',
	'& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
		transform: 'rotate(180deg)',
	},
	'& .MuiAccordionSummary-content': {},
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
	padding: theme.spacing(1),
	paddingBottom: '16px',
}));

function AccordianProvider({ title, children, theme, withoutBorder = false }) {
	if (!withoutBorder)
		return (
			<>
				<Accordion defaultExpanded={true}>
					<AccordionSummary aria-controls='panel1d-content' id='panel1d-header'>
						<div
							className='summary-title'
							style={
								theme.textColor ? { color: theme.textColor } : { color: 'rgba(30, 30, 30, 1)' }
							}>
							{title}
						</div>
					</AccordionSummary>
					<AccordionDetails>{children}</AccordionDetails>
				</Accordion>
			</>
		);
	else
		return (
			<>
				<AccordionWithoutBorder defaultExpanded={true}>
					<AccordionSummary aria-controls='panel1d-content' id='panel1d-header'>
						<div
							className='summary-title'
							style={
								theme.textColor ? { color: theme.textColor } : { color: 'rgba(30, 30, 30, 1)' }
							}>
							{title}
						</div>
					</AccordionSummary>
					<AccordionDetails>{children}</AccordionDetails>
				</AccordionWithoutBorder>
			</>
		);
}

export default AccordianProvider;
