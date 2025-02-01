import type { Meta, StoryObj } from '@storybook/react';
import SiteTitle from "./SiteTitle";

type T = typeof SiteTitle;

export default {
    title: 'organisms/SiteTitle',
    component: SiteTitle,
} satisfies Meta<T>;

export const Default: StoryObj<T> = {};
