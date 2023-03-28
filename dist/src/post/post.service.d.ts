import { Repository, DataSource } from 'typeorm';
import { Post } from '../../mymodel/entities/Post';
export declare class PostService {
    private readonly postRepository;
    private dataSource;
    constructor(postRepository: Repository<Post>, dataSource: DataSource);
    createPost(title: string, content: string): Promise<Post>;
    findAll(): Promise<Post[]>;
    findOne(writeIdx: number): Promise<Post>;
}
