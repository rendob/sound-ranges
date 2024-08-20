import { toggleInstrumentSelection } from "../../../infrastructure/zustand/instruments/action";
import { InstrumentId } from "../../../domain/instrument/instrumentId";
import { dispatch } from "../../../infrastructure/zustand/appStore";
import { useInstrument } from "../../../infrastructure/zustand/instruments/selector";
import { Checkbox } from "../../common/checkbox";
import { instrumentsStyles } from "../style";
import { asInt } from "../../../domain/int";
import { getDisplayName } from "../../../domain/instrument";
import { useTranslation } from "react-i18next";
import { css } from "@emotion/react";
import { chunkWord } from "../../../util/chunkWord";

const styles = {
  chunk: css({
    display: "inline-block",
    whiteSpace: "pre-wrap",
  }),
};

type Props = { id: InstrumentId };

export const InstrumentItem = ({ id }: Props) => {
  const { i18n } = useTranslation();
  const instrument = useInstrument(id);

  const chunkedDisplayName = chunkWord(
    getDisplayName(instrument, i18n.language),
    [" ", "・"],
  ).map((chunk) => (
    <span key={chunk} css={styles.chunk}>
      {chunk}
    </span>
  ));

  const handleClick = () => dispatch(toggleInstrumentSelection(id));

  return (
    <div onClick={handleClick} css={instrumentsStyles.item(asInt(2))}>
      <Checkbox selectionStatus={instrument.selectionStatus} />
      <span css={instrumentsStyles.itemLabel}>{chunkedDisplayName}</span>
    </div>
  );
};
