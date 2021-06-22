import { Request, Response } from 'express';
import { container } from 'tsyringe';

import InviteNewFriendService from '@modules/friends/services/InviteNewFriendService';
import AcceptNewFriendService from '@modules/friends/services/AcceptNewFriendService';
import ListAllFriendsService from '@modules/friends/services/ListAllFriendsService';
import ListPendingOrdersService from '@modules/friends/services/ListPendingOrdersService';
import RejectFriendRequestService from '@modules/friends/services/RejectFriendRequestService';

export default class FriendController {
  public async invite(request: Request, response: Response): Promise<Response> {
    const { friend_id } = request.body;
    const { id } = request.user;

    const inviteNewFriend = container.resolve(InviteNewFriendService);

    const friendResponse = await inviteNewFriend.execute({ user_id: id, friend_id });

    return response.status(200).json(friendResponse);
  }

  public async accept(request: Request, response: Response): Promise<Response> {
    const { id } = request.body;

    const acceptNewFriend = container.resolve(AcceptNewFriendService);

    await acceptNewFriend.execute({ friendRequestId: id });

    return response.status(200).json({ message: 'Friend request accepted' });
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    
    const listAllFriends = container.resolve(ListAllFriendsService);

    const friends = await listAllFriends.execute({ user_id: id });

    return response.status(200).json(friends);
  }

  public async listPending(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    
    const listPendingOrders = container.resolve(ListPendingOrdersService);

    const friendsPending = await listPendingOrders.execute({ user_id: id });

    return response.status(200).json({ friends: friendsPending });
  }

  public async deleteFriendRequest(request: Request, response: Response): Promise<Response> {
    const { id } = request.body;
    
    const rejectFriendRequest = container.resolve(RejectFriendRequestService);

    await rejectFriendRequest.execute({ friendRequestId: id });

    return response.status(200).json({ message: 'Friend request successfully rejected' });
  }
}
