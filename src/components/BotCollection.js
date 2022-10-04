import React from "react";
import BotCard from "./BotCard";
function BotCollection({ bots, selectBot, deleteBot }) {
	// Your code here
	return (
		<div className="ui four column grid">
			<div className="row">
				{bots.map((bot) => (
					<BotCard
						key={bot.id}
						bot={bot}
						onSelectBot={selectBot}
						deleteBot={deleteBot}
					/>
				))}
			</div>
		</div>
	);
}
export default BotCollection;