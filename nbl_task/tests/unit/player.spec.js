import PlayerDetails from '../../src/components/player/PlayerDetails';
import { mount } from '@vue/test-utils';

test('Snapshot test for PlayerDetails', () => {
  const wrapper = mount(PlayerDetails, {
    propsData: {
      details: {
        id: 123,
        first_name: 'Michael',
        height_feet: 3,
        height_inches: 5,
        last_name: 'Jordan',
        position: 'Shooting guard',
        team: 'Chicago Bulls',
        weight_pounds: 50
      }
    }
  });
  expect(wrapper.html()).toMatchSnapshot();
});

test('Check if PlayerDetails is rendering properly', () => {
  const wrapper = mount(PlayerDetails, {
    propsData: {
      details: {
        id: 123,
        first_name: 'Michael',
        height_feet: 3,
        height_inches: 5,
        last_name: 'Jordan',
        position: 'Shooting guard',
        team: 'Chicago Bulls',
        weight_pounds: 50
      }
    }
  });
  const playerDetails = wrapper.find('.player-details__one');
  expect(playerDetails.exists()).toBe(true);
  expect(wrapper.html()).toContain('Michael');
  expect(wrapper.html()).toContain('<li class="player-details__one"><span>Team: Chicago Bulls</span></li>');
});