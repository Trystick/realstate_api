import express from 'express';
import { assignRole, createRole, deleteRole, getRole, getRoles, updateRole } from '../controller/role.js';
import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

router.post('/', createRole);
router.get('/', getRoles);
router.get('/:id',verifyAdmin, getRole);
router.put('/:id', verifyAdmin, updateRole);
router.delete('/:id', verifyAdmin, deleteRole);
router.post('/assign', verifyAdmin, assignRole);

export default router;
