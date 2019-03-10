import React from 'react';

import HandSection from './HandSection';
import RemainingCardsSection from './RemainingCardsSection/';
import './styles.scss';

const SidePanel = props => (
	<div className="side-panel">
		<RemainingCardsSection {...props} />
		<HandSection {...props} />
	</div>
);

export default SidePanel;