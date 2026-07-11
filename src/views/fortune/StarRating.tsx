import { RATING_WORDS, OraclePhrase } from "../../utils/fortunaOracle";

interface StarRatingProps {
  rating: OraclePhrase["rating"];
}

export const StarRating = ({ rating }: StarRatingProps) => {
  return (
    <div>
      <div className="font-cinzel text-[10px] uppercase tracking-[2px] text-fortuna-gold-dim">
        Fortune Rating
      </div>
      <div className="mt-2 font-cinzel text-lg tracking-[1px] text-fortuna-gold-bright">
        {rating} / 5
      </div>
      <div className="mt-1 font-cinzel text-xs tracking-[1px] text-fortuna-gold-soft">
        {RATING_WORDS[rating].toUpperCase()}
      </div>
    </div>
  );
};
