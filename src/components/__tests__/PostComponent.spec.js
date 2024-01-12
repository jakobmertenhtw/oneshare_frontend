import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import PostComponent from '../PostComponent.vue'

describe('PostComponent', () => {
  it('renders properly', () => {

    let post = {
        datum: '1705015266112',
        genreID: 1, 
        likes: 0, 
        postID: 43, 
        text: "Hello Vitest",
        titel: "Hello Vitest",
        user: {
            firstName: 'Jakob', 
            lastName: 'Hansen',
            mail: 'test@mail.com', 
            password: '1234',
            phoneNumber: '0193093284', 
            profileColor: '#000000',
            profilePicture: 'JH',
            userID: 11
        }, 
        userID: 11
    };

    const wrapper = mount(PostComponent, { props: { post_prop: post } })
    expect(wrapper.text()).toContain('Hello Vitest')
  })
})
