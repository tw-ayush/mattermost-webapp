// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React, {memo, PropsWithChildren} from 'react';
import {useIntl} from 'react-intl';

import Menu from 'components/widgets/menu/menu';
import MenuWrapper from 'components/widgets/menu/menu_wrapper';

import Button from 'components/threading/common/button';
import SimpleTooltip from 'components/simple_tooltip';

type Props = {
    isFollowing: boolean,
    isSaved: boolean,
    hasUnreads: boolean,
    actions: {
        follow: () => void,
        unfollow: () => void,
        save: () => void,
        unsave: () => void,
        markRead: () => void,
        markUnread: () => void,
        openInChannel: () => void,
        copyLink: () => void,
    }
};

function ThreadMenu({
    isFollowing,
    isSaved,
    hasUnreads,
    actions: {
        follow,
        unfollow,
        save,
        unsave,
        markRead,
        markUnread,
        openInChannel,
        copyLink,
    },
    children = (
        <Button>
            <i className='Icon icon-dots-vertical'/>
        </Button>
    ),
}: PropsWithChildren<Props>) {
    const {formatMessage} = useIntl();

    return (
        <MenuWrapper
            stopPropagationOnToggle={true}
        >
            <SimpleTooltip
                id='threadActionMenu'
                content={formatMessage({
                    id: 'threading.threadItem.menu',
                    defaultMessage: 'Actions',
                })}
            >
                {children}
            </SimpleTooltip>

            <Menu
                ariaLabel={''}
                openLeft={true}
            >
                {isFollowing ? (
                    <Menu.ItemAction
                        text={formatMessage({
                            id: 'threading.threadMenu.unfollow',
                            defaultMessage: 'Unfollow thread',
                        })}
                        extraText={formatMessage({
                            id: 'threading.threadMenu.unfollowExtra',
                            defaultMessage: 'You won’t be notified about replies',
                        })}
                        onClick={unfollow}
                    />
                ) : (
                    <Menu.ItemAction
                        onClick={follow}
                        text={formatMessage({
                            id: 'threading.threadMenu.follow',
                            defaultMessage: 'Follow thread',
                        })}
                        extraText={formatMessage({
                            id: 'threading.threadMenu.followExtra',
                            defaultMessage: 'You will get notified about replies',
                        })}
                    />
                )}
                <Menu.ItemAction
                    onClick={openInChannel}
                    text={formatMessage({
                        id: 'threading.threadMenu.openInChannel',
                        defaultMessage: 'Open in channel',
                    })}
                />
                {hasUnreads ? (
                    <Menu.ItemAction
                        onClick={markRead}
                        text={formatMessage({
                            id: 'threading.threadMenu.markRead',
                            defaultMessage: 'Mark as read',
                        })}
                    />
                ) : (
                    <Menu.ItemAction
                        onClick={markUnread}
                        text={formatMessage({
                            id: 'threading.threadMenu.markUnread',
                            defaultMessage: 'Mark as unread',
                        })}
                    />
                )}
                {isSaved ? (
                    <Menu.ItemAction
                        onClick={unsave}
                        text={formatMessage({
                            id: 'threading.threadMenu.unsave',
                            defaultMessage: 'Unsave',
                        })}
                    />
                ) : (
                    <Menu.ItemAction
                        onClick={save}
                        text={formatMessage({
                            id: 'threading.threadMenu.save',
                            defaultMessage: 'Save',
                        })}
                    />
                )}
                <Menu.ItemAction
                    onClick={copyLink}
                    text={formatMessage({
                        id: 'threading.threadMenu.copy',
                        defaultMessage: 'Copy link',
                    })}
                />
            </Menu>
        </MenuWrapper>
    );
}

export default memo(ThreadMenu);