import colors from '@constants/colors';

import Text from '@components/Text';

import RequireDotDesc from './desc';

const REQUIRE_DOT_MARGIN_RIGHT = { marginRight: '2px' };

function RequireDot() {
  return (
    <Text block={false} size={12} color={colors.RED_ORIGIN} style={REQUIRE_DOT_MARGIN_RIGHT}>
      *
    </Text>
  );
}

RequireDot.Desc = RequireDotDesc;

export default RequireDot;
