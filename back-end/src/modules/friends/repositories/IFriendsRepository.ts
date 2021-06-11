import ICreateFriendDTO from '@modules/friends/dtos/ICreateFriendDTO';
import Friend from '@modules/friends/infra/typeorm/entities/Friends';

export default interface IUsersRepository {
    create(data: ICreateFriendDTO): Promise<Friend>;
    save(friend: Friend): Promise<void>;
    findFriendsByUserId(user_id: string): Promise<Friend[]>;
    findFriendsAcceptByUserId(user_id: string): Promise<Friend[]>;
    findPendingFriendsByUserId(user_id: string): Promise<Friend[]>;
    findFriendRequestById(id: string): Promise<Friend | undefined>;
    findFriendRequestExistent(user_id: string, friend_id: string): Promise<Friend | undefined>;
    delete(friend: Friend): Promise<void>;
}