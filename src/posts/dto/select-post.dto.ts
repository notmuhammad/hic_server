import { CreatePostDto } from "./create-post.dto";
import { SelectUserDto } from "src/users/dto/select-user.dto";
import { OmitType } from "@nestjs/mapped-types";
import { SelectCommentDto } from "src/comments/dto/select-comment.dto";

export class SelectPostDto extends OmitType(CreatePostDto, ["author"]) {
    author: SelectUserDto;
    comments: Array<SelectCommentDto>;
}