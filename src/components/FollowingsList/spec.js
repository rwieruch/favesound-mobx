import { FollowingsList } from './index';
import { shallow } from 'enzyme';

describe('FollowingsList', () => {

  const props = {
    currentUser: { name: 'x' },
    userEntities: { 1: { name: 'x' }, 2: { name: 'y' } },
    followings: [1],
    nextHref: '/foo',
    requestInProcess: false,
    isExpanded: false,
    onSetToggle: () => {},
    onFetchFollowings: () => {}
  };

  it('renders', () => {
    const element = shallow(<FollowingsList { ...props } />);
    expect(element.find('List')).to.have.length(1);
  });

});
