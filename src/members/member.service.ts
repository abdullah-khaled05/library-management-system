import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from './member.entity';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private memberRepository: Repository<Member>,
  ) {}

  create(dto: CreateMemberDto) {
    const member = this.memberRepository.create(dto);
    return this.memberRepository.save(member);
  }

  findAll() {
    return this.memberRepository.find();
  }

  async findOne(id: number) {
    const member = await this.memberRepository.findOne({ where: { id } });
    if (!member) throw new NotFoundException('Member not found');
    return member;
  }

  async update(id: number, dto: UpdateMemberDto) {
    const member = await this.findOne(id);
    Object.assign(member, dto);
    return this.memberRepository.save(member);
  }

  async remove(id: number) {
    const member = await this.findOne(id);
    return this.memberRepository.remove(member);
  }
}